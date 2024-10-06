import apiInstance from './apis/axios';

const path = '/auth';

const login = async (body: any) =>
  await apiInstance.post(`${path}/login`, body);

export default login;
