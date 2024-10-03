import { IconGlobal } from '@/pages/components/Icon/IconGlobal';
import { IconNotify } from '@/pages/components/Icon/IconNotify';
import { LogoMyWork } from '@/pages/components/Icon/LogoMyWork';
import { Box } from '@mui/material';
import { IconProfile } from '../Icon/IconProfile';
import { useState } from 'react';
import ProfileModal from './Profile/ProfileModal';
import LanguageChangeModal from './LanguageChange/LanguageChangeModal';
import NotificationModal from './Notification/NotificationModal';

export default function Nav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageChangeOpen, setIsLanguageChangeOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  //ProfileModal
  const handleIconProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  //LanguageChangeMadal
  const handleIconGlobalClick = () => {
    setIsLanguageChangeOpen(true);
  };

  const handleCloseLanguageChange = () => {
    setIsLanguageChangeOpen(false);
  };

  //NotificationModal
  const handleNotificationModalOpen = () => setIsNotificationModalOpen(true);
  const handleNotificationModalClose = () => setIsNotificationModalOpen(false);
  return (
    <Box>
      <Box
        sx={{
          width: '100vw',
          height: '64px',
          background: '#FFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          borderBottom: '1px solid #E4DCD3',
        }}
      >
        <LogoMyWork />
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconGlobal
              sx={{ cursor: 'pointer', width: '40px', height: '40px' }}
              onClick={handleIconGlobalClick}
            />

            {/* <IconNotify
              sx={{ cursor: 'pointer', width: '40px', height: '40px' }}
              onClick={handleNotificationModalOpen}
            /> */}
          </Box>
          <IconProfile
            sx={{ cursor: 'pointer', width: '40px', height: '40px' }}
            onClick={handleIconProfileClick}
          />
        </Box>
      </Box>
      <ProfileModal
        isProfileOpen={isProfileOpen}
        handleCloseProfile={handleCloseProfile}
      />
      <LanguageChangeModal
        isLanguageChangeOpen={isLanguageChangeOpen}
        handleCloseLanguageChange={handleCloseLanguageChange}
      />
      <NotificationModal
        isNotificationModalOpen={isNotificationModalOpen}
        handleNotificationModalClose={handleNotificationModalClose}
      />
    </Box>
  );
}
