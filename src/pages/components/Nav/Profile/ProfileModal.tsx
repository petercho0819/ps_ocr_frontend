import { IconLogOut } from '@/pages/components/Icon/IconLogOut';
import { IconProfile } from '@/pages/components/Icon/IconProfile';
import { Divider } from '@mui/material';
import {
  ProfileInfoEmail,
  ProfileInfoRole,
  ProfileInfocontainer,
  ProfileLogOut,
  ProfileModalBox,
  ProfileModalContainer,
  ProfileModalSection,
} from '../Container';
import { useState } from 'react';
import LogOutSureModal from './LogOutSureModal';
import { t } from 'i18next';
import useAuthStore from '@/store/auth.store';
import { useRouter } from 'next/router';

interface ProfileModalProps {
  isProfileOpen: boolean;
  handleCloseProfile: () => void;
}

const ProfileModal = ({
  isProfileOpen,
  handleCloseProfile,
}: ProfileModalProps) => {
  const [isLogOutSureModalOpen, setIsLogOutSureModalOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogOutClick = () => {
    setIsLogOutSureModalOpen(true);
  };
  const handleCloseLogOutSureModal = () => {
    setIsLogOutSureModalOpen(false);
  };

  const handleYesClick = () => {
    logout();
    router.replace('/login');
  };

  return (
    <>
      <ProfileModalContainer open={isProfileOpen} onClose={handleCloseProfile}>
        <ProfileModalBox>
          <ProfileModalSection>
            <IconProfile sx={{ width: '40px', height: '40px' }} />
            <ProfileInfocontainer>
              <ProfileInfoEmail>{user?.email}</ProfileInfoEmail>
              <ProfileInfoRole>{user?.role}</ProfileInfoRole>
            </ProfileInfocontainer>
          </ProfileModalSection>
          <Divider sx={{ background: '#E4DCD3' }} />
          <ProfileModalSection onClick={handleLogOutClick}>
            <IconLogOut />
            <ProfileLogOut>{t('login:log_out')}</ProfileLogOut>
          </ProfileModalSection>
        </ProfileModalBox>
      </ProfileModalContainer>
      <LogOutSureModal
        isLogOutSureModalOpen={isLogOutSureModalOpen}
        handleCloseLogOutSureModal={handleCloseLogOutSureModal}
        handleYesClick={handleYesClick}
      />
    </>
  );
};
export default ProfileModal;
