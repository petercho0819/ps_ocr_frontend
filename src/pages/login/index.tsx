import { Box } from '@mui/material';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import Login from '@/components/Login';
// import Login from '@/pages/components/Login';

export default function LoginPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: '#E4DCD3',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            top: '128px',
            width: '100vw',
            height: 'calc(100% - 128px)',
          }}
        >
          <Box
            sx={{
              background: '#E4DCD3',
              position: 'relative',
              width: '100vw',
              height: '100%',
            }}
          >
            <Box sx={{ height: '100%', width: '100%' }}>
              <Login />
            </Box>
          </Box>
        </Box>
      </Box>
    </I18nextProvider>
  );
}
