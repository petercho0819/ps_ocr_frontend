// ** React Imports
import React, { ChangeEvent, useState } from 'react';

// ** MUI Imports
import {
  Box,
  TableCell,
  Table,
  IconButton,
  TableBody,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//** component
import IconImage from '../Icon/IconImage';
import IconImageUpload from '../Icon/IconImageUpload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//** i18n
import { t } from 'i18next';

//** utils & etc
import {
  HeadText,
  ModelCategoryCell,
  ModelDetailImageBox,
  ModelDetailImageSize,
  ModelDetailRequiredFields,
  ModelDetailRow,
  TableCellTitleText,
} from './Container';
import PrimaryBlueButton from '../Button/PrimaryBlueButton';
import InputBox from '../Box/InputBox';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { addReceipt } from '@/queries/apis/receipt';

const AddReceipt = () => {
  const router = useRouter();

  const handleReceiptTypeChange = (event: any) => {
    const value = event.target.value;
    setReceiptType(value);
  };

  const [receiptName, setReceiptName] = useState('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isAddModelModalOpen, setIsAddModelModalOpen] =
    useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [brochureName, setBrochureName] = useState<string>();
  const [vehicleImage, setVehicleImage] = useState<File | undefined>();
  const [vehicleUri, setVehicleUri] = useState<string | undefined>();
  const [receiptType, setReceiptType] = useState('DINNER_FEE');
  const [receiptMemo, setReceiptMemo] = useState('');
  const [receiptPrice, setReceiptPrice] = useState(0);
  const [receiptNumberOfPeople, setReceiptNumberOfPeople] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  //handleNavigation
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const handleModelSettingPage = () => {
    handleNavigation(`/receiptsetting`);
  };

  //handleChangeFile
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement)?.files?.[0] || null;
    setBrochureName(file?.name);
    setBrochureFile(file);
  };

  //uploadVehicleImage
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

  const isFormValid = () => {
    return (
      vehicleImage &&
      receiptName !== '' &&
      receiptMemo !== '' &&
      receiptPrice > 0 &&
      receiptNumberOfPeople > 0
    );
  };

  /* add Model시 사용하는 function */
  const addReceiptMutation = useMutation(
    async (body: Object) => {
      const response = await addReceipt(body);
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.message == 'Not Found Exception') {
          return;
        }
        setIsSaveLoading(false);
        handleModelSettingPage();
        console.log('onSuccess: addModelMutation');
      },
      onError: (error) => {
        console.error('onError', error);
      },
    },
  );

  //handleSave
  const handleSave = async () => {
    handleAddModelConfirm();
  };

  //modal
  const handleCancelAddModelModal = () => setIsAddModelModalOpen(false);

  const handleAddModelConfirm = () => {
    setIsSaveLoading(true);
    const formData = new FormData();
    formData.append('receiptDate', String(selectedDate));
    formData.append('name', receiptName || '');
    formData.append('numberOfPeople', String(receiptNumberOfPeople));
    formData.append('receiptType', receiptType || '');
    formData.append('price', String(receiptPrice));
    formData.append('memo', receiptMemo || '');
    formData.append('file', vehicleImage || '');
    addReceiptMutation.mutate(formData);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 15,
          width: '100%',
          borderBottom: '1px solid #F8F3F2',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: 585,
            alignItems: 'center',
            contentAlign: 'center',
            gap: '10px',
          }}
        >
          <Box onClick={handleGoBack} sx={{ width: '25px', height: '25px' }}>
            <ArrowBackIcon />
          </Box>
          <HeadText> {t('receipt:add_a_new_receipt')}</HeadText>
        </Box>

        <PrimaryBlueButton
          type="button"
          text="SAVE"
          size="fontPlus"
          disabled={!isFormValid()}
          onClick={handleSave}
        />
      </Box>

      <Box sx={{ padding: '20px ' }}>
        <Table>
          <TableBody>
            <ModelDetailRow>
              <TableCellTitleText>{t('receipt:name')}*</TableCellTitleText>
              <TableCell>
                <InputBox
                  placeholder="Input Text here"
                  value={receiptName}
                  onChange={(e) => setReceiptName(e.target.value)}
                />
              </TableCell>
              <TableCellTitleText>
                {t('receipt:receipt_date')}*
              </TableCellTitleText>
              <ModelCategoryCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="YYYY/MM/DD"
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue: any) => {
                      setSelectedDate(newValue);
                    }}
                    // renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </ModelCategoryCell>
            </ModelDetailRow>
            <ModelDetailRow>
              <TableCellTitleText>
                {t('receipt:receipt_type')}*
              </TableCellTitleText>
              <ModelCategoryCell>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    {t('receipt:receipt_type')}
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    defaultValue={'DINNER_FEE'}
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
              </ModelCategoryCell>
              <TableCellTitleText>{t('receipt:price')}*</TableCellTitleText>
              <ModelCategoryCell>
                <TextField
                  size="small"
                  type="number" // 숫자 입력만 가능
                  inputProps={{ min: 0 }} // 최소값 설정 (필요 시)
                  variant="outlined"
                  value={receiptPrice}
                  onChange={(event) =>
                    setReceiptPrice(Number(event.target.value))
                  }
                />
              </ModelCategoryCell>
            </ModelDetailRow>
            <ModelDetailRow>
              <TableCellTitleText>
                {t('receipt:number_of_people')}*
              </TableCellTitleText>
              <TableCell
                sx={{
                  width: '100px',
                }}
              >
                <TextField
                  size="small"
                  type="number" // 숫자 입력만 가능
                  inputProps={{ min: 1 }} // 최소값 설정 (필요 시)
                  variant="outlined"
                  value={receiptNumberOfPeople}
                  onChange={(event) =>
                    setReceiptNumberOfPeople(Number(event.target.value))
                  }
                />
              </TableCell>
              <TableCellTitleText>{t('receipt:memo')}*</TableCellTitleText>
              <TableCell>
                <InputBox
                  placeholder="Input Text here"
                  value={receiptMemo}
                  onChange={(e) => setReceiptMemo(e.target.value)}
                />
              </TableCell>
            </ModelDetailRow>
            <ModelDetailRow>
              <TableCellTitleText>{t('receipt:image')}*</TableCellTitleText>
              <ModelCategoryCell>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  <ModelDetailImageBox>
                    {vehicleImage ? (
                      <Box
                        sx={{
                          position: 'relative',
                          left: '29px',
                          top: '3px',
                        }}
                      >
                        <img width={364} height={180} src={vehicleUri} />
                      </Box>
                    ) : (
                      <IconImage />
                    )}
                    <Box
                      sx={{
                        position: 'relative',
                        left: vehicleImage ? '-20px' : '134px',
                        top: '70px', // Adjusted position based on vehicleImage condition
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
                  <ModelDetailImageSize>
                    720*405px (jpg,png)
                  </ModelDetailImageSize>
                </Box>
              </ModelCategoryCell>
            </ModelDetailRow>
            <ModelDetailRow></ModelDetailRow>
          </TableBody>
        </Table>
        <ModelDetailRequiredFields>
          {t('receipt:required_fields')}*
        </ModelDetailRequiredFields>
      </Box>
      {/* <ModalComponent
        cancelLabel={t('common:cancel')}
        handleCancel={handleCancelAddModelModal}
        confirmLabel={t('common:confirm')}
        handleConfirm={handleAddModelConfirm}
        title={t('nscModel:are_you_sure_you_want_to_save')}
        body1={t('nscModel:click_confirm_to_save_the_data')}
        isModalOpen={isAddModelModalOpen}
        handleCloseModal={handleCloseAddModelModal}
        isLoading={isSaveLoading}
      /> */}

      {/* <LeaveModal
        isOpen={isLeaveModalOpen}
        handelLeaveModalClose={handleCloseLeaveModal}
        handleCloseUploadModal={handleLeaveConfirm}
      /> */}
    </Box>
  );
};

export default AddReceipt;
