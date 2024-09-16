import apiInstance from './apis/axios';

const path = '/auth';

export const login = async (body: any) =>
  await apiInstance.post(`${path}/login`, body);
