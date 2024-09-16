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
import {
  downloadReceiptExcel,
  getReceiptList,
} from '@/pages/queries/apis/receipt';
import { useRouter } from 'next/navigation';

import { NoDataBox } from '../Common/NoDataBox';

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
      onSuccess: (response: any) => {
        console.log('onSuccess: downloadReceiptExcelMutation');
        console.log('🚀 ~ response:', response);
        const bufferData = new Uint8Array(response?.data);
        const blob = new Blob([bufferData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = URL.createObjectURL(blob);
        console.log('🚀 ~ url:', url);
        const link = document.createElement('a');
        console.log('🚀 ~ link:', link);
        link.href = url;
        link.setAttribute('download', 'payroll_details.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
