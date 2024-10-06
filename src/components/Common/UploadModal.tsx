import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { color } from '@/theme/color';
import Image from 'next/image';
import { t } from 'i18next';

import axios from 'axios';
import { useQueryClient } from 'react-query';
import CloseIcon from '@mui/icons-material/Close';
import ExcelUploadBox from '../Box/ExcelUploadBox';
interface UploadModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleCloseUploadModal: () => void;
  title: string;
  sampleDownloadText: string;
  sampleDownloadBtnText: string;
  sampleDownloadFunc: () => Promise<any>;
  uploadFunc: (formData: FormData) => Promise<any>;
  attachFileText: string;
  confirmText: string;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  handleClose,
  handleCloseUploadModal,
  title,
  sampleDownloadText,
  sampleDownloadBtnText,
  sampleDownloadFunc,
  uploadFunc,
  attachFileText,
  confirmText,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMag, setErrorMag] = useState('');

  const queryClient = useQueryClient();

  const handleSetError = (value: boolean) => {
    setError(value);
  };

  const handleUploadExcel = (file: File) => {
    setSelectedFile(file);
  };

  const handleConfirmUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await uploadFunc(formData);
        console.log('ok', response);

        handleClose();

        setSelectedFile(null);
        queryClient.invalidateQueries('someQueryKey');
      } catch (error) {
        console.error('Upload failed:', error);
        if (axios.isAxiosError(error) && error.response) {
          setErrorMag(
            error.response.data.message ||
              'Failed to upload the file. Please try again.',
          );
        } else {
          setErrorMag('Failed to upload the file. Please try again.');
        }
      }
    }
  };

  const handleOpenLeaveModal = () => {
    setSelectedFile(null);
    if (selectedFile) {
      setIsLeaveModalOpen(true);
      setSelectedFile(null);
      setError(false);
      setErrorMag('');
    } else {
      setError(false);
      handleClose();
      setErrorMag('');
    }
  };

  const handelLeaveModalClose = () => {
    setIsLeaveModalOpen(false);
  };

  const handleSampleDownloadClick = async () => {
    try {
      const response = await sampleDownloadFunc();
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleOpenLeaveModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            background: '#FFFFFF',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                width: '500px',
                textAlign: 'center',
                padding: '20px',
                color: color.text.black,
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                padding: '6px 0',
                right: '-20px',
                cursor: 'pointer',
              }}
              onClick={handleOpenLeaveModal}
            >
              <CloseIcon />
            </Box>
          </Box>

          <Box
            sx={{
              width: '530px',
              height: '115px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#F6F3F2',
              borderRadius: '6px',
              padding: '24px',
              gap: '10px',
            }}
          >
            <Typography variant="h6" color={'#565656'}>
              {sampleDownloadText}
            </Typography>
            <Button
              sx={{
                width: '204px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '6px',
                background: '#00AAD2',
                color: '#FFFFFF',
                '&:hover': {
                  background: '#00AAD2',
                  color: '#FFFFFF',
                },
              }}
              onClick={handleSampleDownloadClick}
            >
              <Image
                width={22}
                height={22}
                src={'/images/ExcelImage.png'}
                alt="excel"
              />
              <Typography variant="h5" sx={{ textTransform: 'none' }}>
                {sampleDownloadBtnText}
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 35px',
            }}
          >
            <Typography variant="h1" color={color.text.black_70}>
              {attachFileText}
            </Typography>
            <ExcelUploadBox
              handleUploadExcel={handleUploadExcel}
              handleSetError={handleSetError}
              setSelectedFile={setSelectedFile}
              setErrorMag={setErrorMag}
            />
          </Box>

          {error && (
            <Typography
              variant="h1"
              color={color.secondary.active_red}
              sx={{ width: '100%', padding: '0 30px 4px 30px' }}
            >
              {t('only_excel')}
            </Typography>
          )}
          <Typography
            variant="h1"
            color={color.secondary.active_red}
            sx={{ width: '100%', padding: '0 30px 4px 30px' }}
          >
            {errorMag}
          </Typography>
          <Box sx={{ padding: '20px 0' }}>
            <Button
              sx={{
                width: '540px',
                height: '38px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                background: color.primary.green,
                color: '#FFFFFF',
                '&:hover': {
                  background: color.primary.green,
                  color: '#FFFFFF',
                },
                '&:disabled': {
                  background: '#4C4E6442',
                  color: '#4C4E6442',
                },
              }}
              disabled={!selectedFile || !!errorMag || error}
              onClick={handleConfirmUpload}
            >
              <Typography variant="body1">{confirmText}</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UploadModal;
