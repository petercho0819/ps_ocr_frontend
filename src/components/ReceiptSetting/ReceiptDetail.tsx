// ** React Imports
import React, { ChangeEvent, useMemo, useState } from 'react';

// ** MUI Imports
import {
  Box,
  TableRow,
  TableCell,
  Table,
  TableBody,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// ** component
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconImageUpload from '../Icon/IconImageUpload';
import InputBox from '../Box/InputBox';
import IconImage from '../Icon/IconImage';
import {
  ContentHeadBtn,
  ContentHeadContainer,
  ContentHeadTitle,
  HeadText,
  ModelCategoryCell,
  ModelDetailBrochureValue,
  ModelDetailImageBox,
  ModelDetailImageSize,
  ModelDetailRequiredFields,
  ModelDetailRow,
  TableCellTitleText,
} from './Container';
import PrimaryBlueButton from '../Button/PrimaryBlueButton';
import GenericButton from '../Button/GenericButton';

import { useMutation, useQuery } from 'react-query';

//utils & etc
import { useRouter } from 'next/router';
import { deleteModelList, updateModelList } from '@/queries/apis/model';
import { SelectChangeEvent } from '@mui/material';

// ** i18n
import { t } from 'i18next';
import {
  deleteReceipt,
  getReceiptDetailById,
  updateReceipt,
} from '@/queries/apis/receipt';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const ReceiptDetail = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [selectedCategory, setSelectedCategory] = React.useState<any>({});
  const [modelName, setModelName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [receiptName, setReceiptName] = useState('');
  const [receiptType, setReceiptType] = useState('DINNER_FEE');
  const [receiptMemo, setReceiptMemo] = useState('');
  const [receiptPrice, setReceiptPrice] = useState(0);
  const [receiptNumberOfPeople, setReceiptNumberOfPeople] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState(false);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [editBrochureName, setEditBrochureName] = useState<string>();
  const [vehicleImage, setVehicleImage] = useState<File | undefined>();
  const [vehicleUri, setVehicleUri] = useState<string>();
  const [receiptDetail, setReceiptDetail] = useState<any>();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    setEditBrochureName(file?.name);
    //@ts-ignore
    setBrochureFile(file);
  };

  const uploadVehicleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (!file) {
      setVehicleImage(undefined);
      setVehicleUri(undefined);
      return;
    }

    const fileTypeImage = file.type.includes('image');

    if (!fileTypeImage) {
      alert('Image File Only');
      return;
    }

    setVehicleImage(file);

    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      setVehicleUri(fileReader.result as string);
    });
    fileReader.readAsDataURL(file);
  };

  const handleGoBack = () => {
    router.back();
  };

  const {
    data,
    isLoading,
    isError,
    refetch: refetchReceipt,
  } = useQuery(
    [_id, 'receiptDetail'],
    async () => {
      const response = await getReceiptDetailById(_id as string);
      if (!response) {
        throw new Error('Failed to fetch modelDetail');
      }
      return response.data;
    },

    {
      onSuccess(data) {
        setModelName(data?.name || '');
        setReceiptDetail(data);
      },
    },
  );

  //
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const deleteReceiptMutation = useMutation(
    async (body: Object) => {
      const response = await deleteReceipt(body);
      return response;
    },
    {
      onSuccess: () => {
        console.log('onSuccess: deleteReceiptMutation');
        handleNavigation(`/receiptsetting`);
      },
      onError: (error) => {
        console.error('onError: deleteReceiptMutation', error);
      },
    },
  );

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedCategory({ label: value });
  };

  const isFormValid = () =>
    receiptDetail.name !== '' &&
    receiptDetail.memo !== '' &&
    receiptDetail.price > 0 &&
    receiptDetail.numberOfPeople > 0;

  const updateReceiptMutation = useMutation(
    async (body: Object) => {
      const response = await updateReceipt(body);
      return response.data;
    },
    {
      onSuccess: () => {
        console.log('onSuccess: updateReceiptMutation');
        refetchReceipt();
        setIsSaving(false);
        setIsEditable(false);
      },
      onError: (error) => {
        console.error('onError: updateReceiptMutation', error);
        refetchReceipt();
        setIsSaving(false);
        setIsEditable(false);
      },
    },
  );
  const handleEdit = () => {
    setIsEditable(true);
  };
  const handleDelete = () => {
    const deleteDTO = {
      ids: [receiptDetail?._id],
    };
    deleteReceiptMutation.mutate(deleteDTO);
  };

  const handleReceiptTypeChange = (event: any) => {
    const value = event.target.value;
    setReceiptDetail({
      ...receiptDetail,
      receiptType: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (isFormValid()) {
      const formData = new FormData();
      formData.append(
        'receiptDate',
        dayjs(selectedDate).format('YYYY-MM-DD') || '',
      );
      formData.append('name', receiptDetail?.name);
      formData.append('_id', receiptDetail?._id);
      formData.append('numberOfPeople', receiptDetail?.numberOfPeople || '');
      formData.append('receiptType', receiptDetail?.receiptType || '');
      formData.append('price', receiptDetail?.price || '');
      formData.append('memo', receiptDetail?.memo || '');
      if (vehicleImage) formData.append('file', vehicleImage);
      updateReceiptMutation.mutate(formData);
    }
  };

  const handleOpenDeleteVModelModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteVModelModal = () => setIsDeleteModalOpen(false);
  const handleDeleteVModel = () => handleDelete();

  return (
    <Box sx={{ height: '100%' }}>
      <ContentHeadContainer>
        <ContentHeadTitle>
          <Box onClick={handleGoBack} sx={{ width: '25px', height: '25px' }}>
            <ArrowBackIcon />
          </Box>
          <HeadText>{receiptDetail?.name}</HeadText>
        </ContentHeadTitle>

        <ContentHeadBtn>
          {isEditable ? (
            <PrimaryBlueButton
              type="button"
              text={isSaving ? t('common:saving') : t('common:save')}
              size="fontPlus"
              disabled={!isFormValid() || isSaving}
              onClick={handleSave}
            />
          ) : (
            <>
              <GenericButton
                type="button"
                disabled={receiptDetail?.isApprove}
                text={
                  receiptDetail?.isApprove
                    ? t('common:approve')
                    : t('common:edit')
                }
                onClick={handleEdit}
              />
              <GenericButton
                disabled={receiptDetail?.isApprove}
                type="button"
                text={
                  receiptDetail?.isApprove
                    ? t('common:approve')
                    : t('common:delete')
                }
                onClick={handleOpenDeleteVModelModal}
              />
            </>
          )}
        </ContentHeadBtn>
      </ContentHeadContainer>

      <Box sx={{ padding: '20px ' }}>
        <Table>
          <TableBody>
            <ModelDetailRow>
              <TableCellTitleText>{t('receipt:name')} *</TableCellTitleText>
              <ModelCategoryCell>
                {isEditable ? (
                  <>
                    <InputBox
                      placeholder="Input Text here"
                      value={receiptDetail?.name}
                      onChange={(e) =>
                        setReceiptDetail({
                          ...receiptDetail,
                          name: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>{receiptDetail?.name}</>
                )}
              </ModelCategoryCell>
              <TableCellTitleText>
                {t('receipt:receipt_date')} *
              </TableCellTitleText>
              <ModelCategoryCell>
                {isEditable ? (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="YYYY/MM/DD"
                        label="Select Date"
                        value={dayjs(receiptDetail?.receiptDate)}
                        onChange={(newValue: any) => {
                          setSelectedDate(newValue);
                        }}
                        // renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </>
                ) : (
                  <>{receiptDetail?.receiptDate}</>
                )}
              </ModelCategoryCell>
            </ModelDetailRow>
            <ModelDetailRow>
              <TableCellTitleText>
                {t('receipt:receipt_type')} *
              </TableCellTitleText>
              <ModelCategoryCell>
                {isEditable ? (
                  <>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        {t('receipt:receipt_type')}
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        defaultValue={receiptDetail?.receiptType}
                        label={t('receipt:receipt_type')}
                        onChange={handleReceiptTypeChange}
                      >
                        <MenuItem value={'DINNER_FEE'}>
                          {t('receipt:dinner_fee')}
                        </MenuItem>
                        <MenuItem value={'TAXI_FEE'}>
                          {t('receipt:taxi_fee')}
                        </MenuItem>
                        <MenuItem value={'ETC'}> {t('receipt:etc')}</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <>{receiptDetail?.receiptType}</>
                )}
              </ModelCategoryCell>

              <TableCellTitleText>{t('receipt:price')} *</TableCellTitleText>
              <ModelCategoryCell>
                {isEditable ? (
                  <>
                    <TextField
                      size="small"
                      type="number" // 숫자 입력만 가능
                      inputProps={{ min: 0 }} // 최소값 설정 (필요 시)
                      variant="outlined"
                      value={receiptDetail?.price}
                      onChange={(event) =>
                        setReceiptDetail({
                          ...receiptDetail,
                          price: event.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>{receiptDetail?.price}</>
                )}
              </ModelCategoryCell>
            </ModelDetailRow>
            <ModelDetailRow>
              <TableCellTitleText>
                {t('receipt:number_of_people')} *
              </TableCellTitleText>
              <ModelCategoryCell>
                {isEditable ? (
                  <>
                    <TextField
                      size="small"
                      type="number" // 숫자 입력만 가능
                      inputProps={{ min: 1 }} // 최소값 설정 (필요 시)
                      variant="outlined"
                      value={receiptDetail?.numberOfPeople}
                      onChange={(event) =>
                        setReceiptDetail({
                          ...receiptDetail,
                          numberOfPeople: event.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>{receiptDetail?.numberOfPeople}</>
                )}
              </ModelCategoryCell>

              <TableCellTitleText>{t('receipt:memo')} *</TableCellTitleText>
              <ModelCategoryCell>
                {isEditable ? (
                  <>
                    <InputBox
                      placeholder="Input Text here"
                      value={receiptDetail?.memo}
                      onChange={(e) =>
                        setReceiptDetail({
                          ...receiptDetail,
                          memo: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>{receiptDetail?.memo}</>
                )}
              </ModelCategoryCell>
            </ModelDetailRow>
            <ModelDetailRow>
              <TableCellTitleText>{t('receipt:image')} *</TableCellTitleText>
              <ModelCategoryCell>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  {isEditable ? (
                    <>
                      <ModelDetailImageBox>
                        <Box
                          sx={{ position: 'relative', bottom: -3, left: 28 }}
                        >
                          <img
                            width={364}
                            height={180}
                            src={vehicleUri || receiptDetail?.imgPath}
                          ></img>
                        </Box>
                        <Box
                          sx={{
                            position: 'relative',
                            bottom: -65,
                            left: -25,
                          }}
                        >
                          <IconButton component="label" htmlFor="upload-img">
                            <input
                              onChange={uploadVehicleImage}
                              hidden
                              type="file"
                              accept="image/*"
                              id="upload-img"
                            />
                            <IconImageUpload />
                          </IconButton>
                        </Box>
                      </ModelDetailImageBox>
                    </>
                  ) : receiptDetail?.imgPath ? (
                    <ModelDetailImageBox>
                      <Box>
                        <img
                          width={364}
                          height={180}
                          src={receiptDetail?.imgPath}
                        ></img>
                      </Box>
                    </ModelDetailImageBox>
                  ) : (
                    <ModelDetailImageBox>
                      <IconImage />
                      <Box
                        sx={{
                          position: 'relative',
                          left: '134px',
                          top: '70px',
                        }}
                      />
                    </ModelDetailImageBox>
                  )}

                  <ModelDetailImageSize>
                    720*405px (jpg,png)
                  </ModelDetailImageSize>
                </Box>
              </ModelCategoryCell>
              <TableCell />
              <TableCell />
            </ModelDetailRow>
          </TableBody>
        </Table>

        <ModelDetailRequiredFields>
          {t('receipt:required_fields')}*
        </ModelDetailRequiredFields>
      </Box>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        handleClose={handleCloseDeleteVModelModal}
        handleConfirmDelete={handleDeleteVModel}
      />
    </Box>
  );
};

export default ReceiptDetail;
