import apiInstance from './axios';

const memberPath = 'users';

export const getMemberDetail = async (email: string) =>
  await apiInstance.get(`${memberPath}/${email}`);

export const getMemberListByAdmin = async () =>
  await apiInstance.get(`${memberPath}/admin/list`);

export const deleteMember = async (nscEmailToDelete: string[]) =>
  await apiInstance.delete(`${memberPath}`, {
    data: { emails: nscEmailToDelete },
  });
