import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { Box, Grid } from '@mui/material';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/pages/i18n';
import SideBar from '@/pages/components/Nav/SiderBar';
// import LeaveModal from '@/components/NscDealership/Modal/LeaveModal';
import Footer from './components/Common/Footer';
import Nav from './components/Nav';
import { getMemberInfoByToken } from './queries/apis/member';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const AddDealershipformRef = useRef<HTMLDivElement>(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfoByToken();
        setMemberInfo(response.data);
      } catch (error) {
        console.error('Error fetching member info:', error);
      }
    };

    fetchMemberInfo();
  }, []);

  // const handleOpenLeaveModal = (path: string | null) => {
  //   setTargetPath(path);
  //   setIsLeaveModalOpen(true);
  // };

  // const handelLeaveModalClose = () => {
  //   setIsLeaveModalOpen(false);
  // };

  // const handleConfirmLeave = () => {
  //   setIsLeaveModalOpen(false);
  //   if (targetPath) {
  //     router.push(targetPath);
  //   }
  // };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     AddDealershipformRef.current &&
  //     !AddDealershipformRef.current.contains(event.target as Node)
  //   ) {
  //     let target = event.target as HTMLElement;
  //     while (
  //       target &&
  //       !target.hasAttribute('href') &&
  //       target !== document.body
  //     ) {
  //       target = target.parentElement as HTMLElement;
  //     }
  //     if (target && target.hasAttribute('href')) {
  //       handleOpenLeaveModal(target.getAttribute('href'));
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     router.pathname === '/dealership/add' ||
  //     router.pathname === '/member/add' ||
  //     router.pathname === '/modelsetting/add'
  //   ) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [router.pathname]);

  return (
    <I18nextProvider i18n={i18n}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: '#F6F3F2',
        }}
      >
        <Box sx={{ position: 'fixed', width: '100vw', zIndex: 1000 }}>
          <Nav />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: '64px',
            width: '100vw',
            height: 'calc(100% - 64px)',
          }}
        >
          <Box
            sx={{
              background: '#F6F3F2',
              position: 'relative',
              width: '100vw',
              height: '100%',
            }}
          >
            <SideBar />
            <Grid
              sx={{
                position: 'relative',
                left: '240px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              ref={AddDealershipformRef}
            >
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    padding: '20px',
                  }}
                >
                  <Box
                    sx={{
                      width: 'calc(100% - 240px)',
                      height: '100%',
                      background: '#FFFFFF',
                      borderRadius: '10px',
                    }}
                  >
                    {children}
                  </Box>
                </Box>
              </Box>
              {/* <Footer /> */}
            </Grid>
          </Box>
        </Box>
        {/* <LeaveModal
          isOpen={isLeaveModalOpen}
          handelLeaveModalClose={handelLeaveModalClose}
          handleCloseUploadModal={handleConfirmLeave}
        /> */}
      </Box>
    </I18nextProvider>
  );
}
