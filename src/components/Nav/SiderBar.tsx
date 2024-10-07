import { Box, styled } from '@mui/material';

import Link from 'next/link';
import { useRouter } from 'next/router';
import ColorButton from '../Button/ColorButton';

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

const navItems = [
  // { path: '/dashboard', text: 'Dashboard' },
  { path: '/receiptsetting', text: 'Receipt' },
  { path: '/mypage', text: 'My Page' },
];

export default function SideBar() {
  const { pathname } = useRouter();

  return (
    <SideBarMainBox>
      {navItems.map((item, index) => (
        <Link key={index} href={item.path} passHref>
          <ColorButton
            type="button"
            text={item.text}
            size="xl"
            isActive={item.path.split('/')[1] === pathname.split('/')[1]}
          />
        </Link>
      ))}
    </SideBarMainBox>
  );
}
