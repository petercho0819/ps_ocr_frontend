import apiInstance from './axios';

const memberPath = 'users';

export const getMemberDetail = async (email: string) =>
  await apiInstance.get(`${memberPath}/${email}`);
