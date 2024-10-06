// ** react
import React from 'react';

// ** mui
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// ** i18n
import { t } from 'i18next';
import ExcelJS from 'exceljs';
import axios from 'axios';

// ** utils & etc
import {
  ModelRightContainer,
  ModelRightHead,
  ModelRightHeadNum,
  ModelRightHeadText,
  ModelRightHeadTextBox,
  ModelRightTableBodyCell,
  ModelRightTableCell,
} from './Container';
import GenericButton from '../Button/GenericButton';
import PrimaryBlueButton from '../Button/PrimaryBlueButton';
import { useMutation, useQuery } from 'react-query';
import getReceiptList, { downloadReceiptExcel } from '@/queries/apis/receipt';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth.store';

import NoDataBox from '../Common/NoDataBox';

export interface ReceiptRightDetailType {
  handleSelectedYear: (item: string) => void;
  handleSelectedMonth: (item: string) => void;
  selectedMonth: string;
  selectedYear: string;
}

const ReceiptRightDetail = ({
  handleSelectedYear,
  handleSelectedMonth,
  selectedMonth,
  selectedYear,
}: ReceiptRightDetailType) => {
  const router = useRouter();
  const user = useAuthStore.getState().user;

  const {
    data: receiptList,
    isLoading,
    isError,
    refetch,
  } = useQuery([selectedMonth, selectedYear, 'getReceiptList'], async () => {
    const response = await getReceiptList(selectedYear, selectedMonth);
    if (!response) {
      throw new Error('Failed to fetch vModel');
    }
    return response.data;
  });

  const handleDownloadExcel = () => {
    const excelDownloadDTO = {
      year: selectedYear,
      month: selectedMonth,
    };
    downloadReceiptExcelMutation.mutate(excelDownloadDTO);
  };

  const downloadReceiptExcelMutation = useMutation(
    async (body: Object) => {
      const response = await downloadReceiptExcel(body);
      return response;
    },
    {
      onSuccess: async (response: any) => {
        console.log('onSuccess: downloadReceiptExcelMutation');
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');

        // 헤더 행의 높이 설정 (예: 30)
        sheet.getRow(1).height = 30;

        // 엑셀 시트에 열 추가 및 너비 설정
        sheet.columns = [
          { header: 'Receipt Date', key: 'receiptDate', width: 20 },
          { header: 'Receipt Type', key: 'receiptType', width: 20 },
          { header: 'Price', key: 'price', width: 10 },
          { header: 'Number of People', key: 'numberOfPeople', width: 20 },
          { header: 'Name', key: 'name', width: 15 },
          { header: 'Memo', key: 'memo', width: 20 },
          { header: 'Image', key: 'imgPath', width: 300 / 7 }, // 약 42.86 (ExcelJS에서는 너비를 문자 단위로 사용)
        ];

        const fetchImage = async (url: string): Promise<Buffer> => {
          try {
            const response = await axios.get(url, {
              responseType: 'arraybuffer',
            });
            return Buffer.from(response.data, 'binary');
          } catch (error) {
            console.error('Error fetching image:', error);
            return Buffer.from('');
          }
        };
        const rows = response.data.map((v: any) => ({
          receiptDate: v?.receiptDate,
          receiptType: v?.receiptType,
          price: v?.price,
          numberOfPeople: v?.numberOfPeople,
          name: v?.name,
          memo: v?.memo,
        }));

        sheet.addRows(rows);

        // 이미지 높이를 포함한 행 높이를 설정합니다
        const ROW_HEIGHT = 250; // 또는 원하는 높이

        for (let i = 0; i < response.data.length; i++) {
          const v = response.data[i];
          const rowNumber = i + 2; // 헤더를 고려하여 2부터 시작

          // 모든 행의 높이를 일관되게 설정
          sheet.getRow(rowNumber).height = ROW_HEIGHT;

          if (v?.imgPath) {
            try {
              const imageBuffer = await fetchImage(v.imgPath);
              const imageId = workbook.addImage({
                buffer: imageBuffer,
                extension: 'png',
              });

              // 이미지를 현재 행에 추가
              sheet.addImage(imageId, {
                //@ts-ignore
                tl: { col: 6, row: rowNumber - 1 },
                //@ts-ignore
                br: { col: 7, row: rowNumber },
                editAs: 'oneCell',
              });
            } catch (error) {
              console.error('Error adding image:', error);
            }
          }
        }

        // 엑셀 파일 생성 및 다운로드
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${user.name}_${selectedYear}_${selectedMonth}`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      onError: (error) => {
        console.error('onError: downloadReceiptExcelMutation', error);
      },
    },
  );

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const handleAddButtonClick = () => {
    handleNavigation(`/receiptsetting/add`);
  };
  const handleListClick = (modelCode: string | undefined) => {
    handleNavigation(`/receiptsetting/${modelCode}`);
  };

  return (
    <ModelRightContainer>
      {/* ModelRightHead  */}
      <ModelRightHead>
        <ModelRightHeadTextBox>
          <ModelRightHeadText>
            {selectedYear} - {selectedMonth}
          </ModelRightHeadText>
        </ModelRightHeadTextBox>
        <ModelRightHeadTextBox>
          <Box sx={{ minWidth: '220px' }}>
            {/* <InputBox type="search" onChange={handleSearchInputChange} /> */}
          </Box>

          <PrimaryBlueButton
            type="button"
            text={t('receipt:excel')}
            size="fontPlus"
            disabled={receiptList?.length == 0}
            onClick={handleDownloadExcel}
          />
          <PrimaryBlueButton
            type="button"
            text={t('receipt:word')}
            size="fontPlus"
            disabled={receiptList?.length == 0}
            // onClick={handleSaveClick}
          />
          <GenericButton
            type="button"
            text={t('common:add')}
            onClick={handleAddButtonClick}
          />
        </ModelRightHeadTextBox>
      </ModelRightHead>

      {/* TableContainer */}
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              backgroundColor: '#f6f3f2',
            }}
          >
            <TableRow sx={{ width: '100%' }}>
              <ModelRightTableCell sx={{ minWidth: '200px' }}>
                {t('receipt:name')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '160px' }}>
                {t('receipt:price')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '160px' }}>
                {t('receipt:receipt_date')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '50px' }}>
                {t('receipt:number_of_people')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '100px' }}>
                {t('receipt:memo')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '100px' }}>
                {t('receipt:image')}
              </ModelRightTableCell>
            </TableRow>
          </TableHead>
          {receiptList && receiptList.length > 0 ? (
            <>
              <TableBody>
                {receiptList.map((v: any) => {
                  return (
                    <TableRow onClick={() => handleListClick(v._id)}>
                      <ModelRightTableBodyCell>
                        {v.name || '-'}
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        {v.price || '-'}
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        {v.receiptDate || '-'}
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        {v.numberOfPeople}
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        {v.memo}
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        {v?.imgPath ? (
                          <img height={50} width={100} src={v.imgPath}></img>
                        ) : (
                          '-'
                        )}
                      </ModelRightTableBodyCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: 'none',
                    height: '400px',
                  }}
                  colSpan={7}
                >
                  <NoDataBox
                    titleText={t('receipt:no_data_title')}
                    subText={t('receipt:no_data_sub')}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TableContainer>
        <Table>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
      {/* 
      {filteredData && filteredData.length > 0 && (
        <ModelPagination
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      )}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        handleClose={handleCloseDeleteVModelModal}
        handleConfirmDelete={handleDeleteVModel}
      /> */}
    </ModelRightContainer>
  );
};

export default ReceiptRightDetail;
