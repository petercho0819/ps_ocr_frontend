import { color } from '@/theme/color';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';

export interface ModalComponentType {
  cancelLabel: string;
  handleCancel: () => void;
  confirmLabel: string;
  handleConfirm: () => void;
  title: string;
  body1?: string;
  body2?: string;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  isLoading: boolean;
}

const ModalComponent = ({
  handleCloseModal,
  isModalOpen,
  title,
  body1,
  body2,
  handleCancel,
  handleConfirm,
  cancelLabel,
  confirmLabel,
  isLoading,
}: ModalComponentType) => {
  return (
    <Dialog
      sx={{
        width: '100%',
      }}
      onClose={handleCloseModal}
      open={isModalOpen}
    >
      <DialogTitle
        sx={{
          width: '600px',
          fontFamily: 'Hyundai Sans Head',
          fontWeight: 700,
          fontSize: '20px',
          color: 'rgba(17, 17, 17, 1)',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontFamily: 'Hyundai Sans Text',
            fontWeight: 500,
            fontSize: '16px',
            color: 'rgba(17, 17, 17, 1)',
            pb: 1,
          }}
        >
          {body1}
        </DialogContentText>
        <DialogContentText
          sx={{
            fontFamily: 'Hyundai Sans Text',
            fontWeight: 500,
            fontSize: '16px',
            color: 'rgba(17, 17, 17, 1)',
          }}
        >
          {body2}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {isLoading ? (
          <>
            <Box
              sx={{
                mr: 10,
              }}
            >
              <CircularProgress size="1.7rem" color="primary" />
            </Box>
          </>
        ) : (
          <>
            <Button
              sx={{
                color: color.grey[400],
              }}
              onClick={handleCancel}
              //   disabled={}
            >
              {cancelLabel}
            </Button>
            <Button
              sx={{
                color: color.primary.green,
              }}
              //   disabled={}
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default ModalComponent;
