import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { color } from '@/theme/color';
import { t } from 'i18next';

const ConfirmDeleteModal = ({
  isOpen,
  handleClose,
  handleConfirmDelete,
}: any) => {
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
          padding: '20px',
        }}
      >
        <Typography variant="h2" sx={{ color: color.text.black }}>
          {t('common:are_you_sure_delete')}
        </Typography>
        <Typography sx={{ padding: '20px 0', color: color.text.black }}>
          {t('common:if_click_confirm')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Typography
            variant="body1"
            onClick={handleClose}
            sx={{
              padding: '10px',
              color: color.text.black_40,
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            {t('common:cancel')}
          </Typography>
          <Typography
            variant="body1"
            onClick={handleConfirmDelete}
            sx={{
              padding: '10px ',
              color: color.primary.green,
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            {t('common:confirm')}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
