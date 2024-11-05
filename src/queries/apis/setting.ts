import settingApiInstance from './axios/notification';

const settingPath = 'setting';

export const getEmailSetting = async () =>
  await settingApiInstance.get(`${settingPath}/date`);

export const updateEmailSetting = async (data: void) =>
  await settingApiInstance.post(`${settingPath}/date`, data);
