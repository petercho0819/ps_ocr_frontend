import { Box, styled } from '@mui/material';

import Link from 'next/link';
import { useRouter } from 'next/router';
import ColorButton from '../Button/ColorButton';
import useAuthStore from '@/store/auth.store';
import { useEffect, useState } from 'react';

const SideBarMainBox = styled(Box)(() => ({
  height: '100%',
  width: '240px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'start',
  position: 'fixed',
  zIndex: '1',
  left: '0',
  backgroundColor: '#FFF',
  padding: '20px 12px',
  gap: '8px',
  overflowY: 'auto',
}));

export default function SideBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    const checkAndUpdateUser = () => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser(currentUser);
      } else {
        // 사용자 정보가 없다면 잠시 후 다시 확인
        setTimeout(checkAndUpdateUser, 100);
      }
    };

    checkAndUpdateUser();
  }, []);

  const navItems =
    //@ts-ignore
    user?.role == 'ADMIN'
      ? [
          { path: '/receiptlist', text: 'Receipt' },
          { path: '/member', text: 'Member' },
          { path: '/mypage', text: 'My Page' },
        ]
      : [
          { path: '/receiptsetting', text: 'Receipt' },
          { path: '/mypage', text: 'My Page' },
        ];
  const { pathname } = useRouter();

  return (
    <SideBarMainBox>
      {navItems?.map((item, index) => (
        <Link key={index} href={item.path} passHref>
          <ColorButton
            type="button"
            text={item.text}
            size="xl"
            isActive={item?.path?.split('/')[1] === pathname?.split('/')[1]}
          />
        </Link>
      ))}
    </SideBarMainBox>
  );
}
