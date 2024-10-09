import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { color } from '@/theme/color';
import { t } from 'i18next';

const CantDeleteModal = ({ isOpen, handleClose }: any) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
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
          borderRadius: '10px',
          background: '#FFFFFF',
        }}
      >
        <Typography
          variant="h2"
          sx={{ padding: '20px', color: color.text.black }}
        >
          {t('member:manager_deleted')}
        </Typography>
        <Typography
          variant="h5"
          sx={{ padding: '0 20px', color: color.text.black }}
        >
          {t('member:adjustment_nsc_only')}
        </Typography>
        <Typography
          variant="body1"
          onClick={handleClose}
          sx={{
            padding: '20px ',
            color: color.primary.green,
            textAlign: 'end',
            cursor: 'pointer',
          }}
        >
          {t('member:close')}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CantDeleteModal;
