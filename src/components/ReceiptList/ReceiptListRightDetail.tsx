// ** react
import React, { useState } from 'react';

// ** mui
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
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
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useMutation, useQuery } from 'react-query';
import {
  downloadReceiptExcel,
  getReceiptListByAdmin,
} from '@/queries/apis/receipt';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth.store';

import NoDataBox from '../Common/NoDataBox';
import NotDevelopedModal from './NotDevelopedModal';
// import NotDevelopedModal from './NotDevelopedModal';

export interface ReceiptRightDetailType {
  handleSelectedYear: (item: string) => void;
  handleSelectedMonth: (item: string) => void;
  selectedMonth: string;
  selectedYear: string;
}

const ReceiptListRightDetail = ({
  handleSelectedYear,
  handleSelectedMonth,
  selectedMonth,
  selectedYear,
}: ReceiptRightDetailType) => {
  const router = useRouter();
  const [isNotDevelopedModalOpen, setIsNotDevelopedModalOpen] = useState(false);
  const user = useAuthStore.getState().user;

  const {
    data: receiptList,
    isLoading,
    isError,
    refetch,
  } = useQuery([selectedMonth, selectedYear, 'getReceiptList'], async () => {
    const response = await getReceiptListByAdmin(selectedYear, selectedMonth);
    if (!response) {
      throw new Error('Failed to fetch vModel');
    }
    return response.data;
  });

  const handleDownloadExcel = async (userName: string, excelData: any) => {
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
    const rows = excelData.map((v: any) => ({
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

    for (let i = 0; i < excelData.length; i++) {
      const v = excelData[i];
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
    anchor.download = `${userName}_${selectedYear}_${selectedMonth}`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const handleNotDevelopedModal = () => setIsNotDevelopedModalOpen(false);
  const handleDownloadWord = () => setIsNotDevelopedModalOpen(true);

  const handleNavigation = (path: string) => {
    router.push(path);
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

          {/* <PrimaryBlueButton
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
            onClick={handleDownloadWord}
          />
          <GenericButton
            type="button"
            text={t('common:add')}
            onClick={handleAddButtonClick}
          /> */}
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
              <ModelRightTableCell sx={{ minWidth: '150px' }}>
                {t('receipt:user_name')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '230px' }}>
                {t('receipt:user_email')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '140px' }}>
                {t('receipt:excel')}
              </ModelRightTableCell>
              <ModelRightTableCell sx={{ minWidth: '140px' }}>
                {t('receipt:word')}
              </ModelRightTableCell>
              {/* <ModelRightTableCell sx={{ minWidth: '40px' }}>
                {t('receipt:approve')}
              </ModelRightTableCell> */}
            </TableRow>
          </TableHead>
          {isLoading ? (
            <>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      height: '400px',
                      display: 'flex',
                    }}
                    rowSpan={8}
                  >
                    <CircularProgress size={40} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          ) : receiptList && receiptList?.length > 0 ? (
            <>
              <TableBody>
                {receiptList?.map((v: any) => {
                  return (
                    <TableRow
                      key={v._id}
                      // onClick={() => handleListClick(v._id)}
                    >
                      <ModelRightTableBodyCell>
                        {v.userName || '-'}
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        {v.userEmail || '-'}
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        <Button
                          onClick={() =>
                            handleDownloadExcel(v.userName, v.excelData)
                          }
                        >
                          <FileDownloadIcon color="success" />
                        </Button>
                      </ModelRightTableBodyCell>
                      <ModelRightTableBodyCell>
                        <Button onClick={() => handleDownloadWord()}>
                          <FileDownloadIcon color="primary" />
                        </Button>
                      </ModelRightTableBodyCell>
                      {/* <ModelRightTableBodyCell>
                        {v?.isApprove ? 'Y' : 'N'}
                      </ModelRightTableBodyCell> */}
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
      <NotDevelopedModal
        isOpen={isNotDevelopedModalOpen}
        // handleClose={handleCloseNotDevelopedModal}
        handleConfirmDelete={handleNotDevelopedModal}
      />
    </ModelRightContainer>
  );
};

export default ReceiptListRightDetail;
