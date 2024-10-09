import useAuthStore from '@/store/auth.store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

/**
 * Authentication
 */
// const useAuth = () => {
//   const { accessToken, user, refreshToken, login, logout } = useAuthStore();
//   const router = useRouter();

//   const { isLoading, isSuccess, refetch } = useQuery(
//     ['getUserInfo'],
//     getMemberInfoByToken,
//     {
//       onSuccess: ({ data }) => {
//         login({ accessToken, refreshToken, user: data });
//       },
//       onError: () => {
//         logout();
//         router.replace('/login');
//       },
//       retry: false,
//     },
//   );

//   useEffect(() => {
//     if (!isLoading && !user) {
//       refetch();
//     }
//   }, [isSuccess, accessToken, user]);
//   return { isLoading };
// };

// export default useAuth;
