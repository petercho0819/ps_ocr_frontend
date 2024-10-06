import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  ProfileModalContainer,
  NotiDetailModalContainer,
  NotiDetailSort,
  NotiDetailSubTitle,
  NotiDetailText,
  NotiDetaildate,
} from '../Container';
import { Box } from '@mui/material';
import { color } from '@/theme/color';

interface NotiDeatailModalProps {
  isDetailsModalOpen: boolean;
  handleDetailsModalClose: () => void;
}

function DetailsModal({
  isDetailsModalOpen,
  handleDetailsModalClose,
}: NotiDeatailModalProps) {
  return (
    <ProfileModalContainer
      open={isDetailsModalOpen}
      onClose={handleDetailsModalClose}
    >
      <NotiDetailModalContainer>
        <Box sx={{ paddingBottom: '24px' }}>
          <IconButton
            aria-label="close"
            onClick={handleDetailsModalClose}
            sx={{
              position: 'absolute',
              right: 24,
              top: 16,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h2"
            color={color.text.black}
            textAlign={'center'}
          >
            Details
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gap: '8px', paddingBottom: '20px' }}>
          <Box sx={{ display: 'flex' }}>
            <NotiDetailSort>Live Consultation</NotiDetailSort>
            <NotiDetailSort sx={{ padding: '0 4px' }}>|</NotiDetailSort>
            <NotiDetailSubTitle>
              Deployment for Translation updated
            </NotiDetailSubTitle>
          </Box>
          <NotiDetaildate>2024/01/03 THU 21:32PM</NotiDetaildate>
        </Box>
        <Box>
          <NotiDetailText> - Translation applied: FR (PRD)</NotiDetailText>
          <NotiDetailText>
            - Loading bar has been added for the Chat history in the Call-center
            app
          </NotiDetailText>
          <NotiDetailText>
            {' '}
            - Dealer PC App `&gt;` Live Consult on the translation master
          </NotiDetailText>
        </Box>
      </NotiDetailModalContainer>
    </ProfileModalContainer>
  );
}

export default DetailsModal;
