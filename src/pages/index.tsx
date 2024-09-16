import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DASHBOARD_PATH, LOGIN_PATH } from '@/common/constants';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const lowercasePath = router.pathname.toLowerCase();
    if (lowercasePath === '/') {
      router.replace(LOGIN_PATH);
      // router.replace(LOGIN_PATH);
      // router.replace('/testPage');
    }
  }, [router]);
  return <></>;
};

export default Page;
