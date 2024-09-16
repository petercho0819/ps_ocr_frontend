import { Modal } from '@mui/material';
import { LogOutSureModalBox, ModalActionBlueText, ModalActionGrayText, ModalActionTextBox, ModalBodyText, ModalHeadText } from '../Container';
import { t } from 'i18next';

interface ProfileModalProps {
  isLogOutSureModalOpen: boolean;
  handleCloseLogOutSureModal: () => void;
  handleYesClick: () => void;
}

const LogOutSureModal = ({ isLogOutSureModalOpen, handleCloseLogOutSureModal, handleYesClick }: ProfileModalProps) => {
  return (
    <Modal
      open={isLogOutSureModalOpen}
      onClose={handleCloseLogOutSureModal}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LogOutSureModalBox>
        <ModalHeadText>{t('login:log_out')}</ModalHeadText>
        <ModalBodyText>{t('login:confirm_log_out')}</ModalBodyText>
        <ModalActionTextBox>
          <ModalActionGrayText onClick={handleCloseLogOutSureModal}>{t('login:cancel')}</ModalActionGrayText>
          <ModalActionBlueText
            onClick={() => {
              handleYesClick();
              handleCloseLogOutSureModal();
            }}
          >
            {t('login:yes')}
          </ModalActionBlueText>
        </ModalActionTextBox>
      </LogOutSureModalBox>
    </Modal>
  );
};
export default LogOutSureModal;
