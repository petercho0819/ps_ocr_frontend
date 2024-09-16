import { receiptBaseURL } from '@/common/constants';
import useAuthStore from '@/store/auth.store';

import axios from 'axios';

const receiptApiInstance = axios.create({
  baseURL: receiptBaseURL,
});

receiptApiInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Authentication = `${accessToken}`;
  }

  return config;
});

receiptApiInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      if (!('data' in response))
        console.log('API response success - but data is empty');
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(error.response.status);
    }
    return Promise.reject(error);
  },
);

export default receiptApiInstance;
