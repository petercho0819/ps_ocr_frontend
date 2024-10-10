import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DASHBOARD_PATH, LOGIN_PATH } from '@/common/constants';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    console.log('test');
    const lowercasePath = router.pathname.toLowerCase();
    if (lowercasePath === '/') {
      router.replace(LOGIN_PATH);
    }
  }, [router]);
  return <></>;
};

export default Page;
