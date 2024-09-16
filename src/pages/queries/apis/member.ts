import { MemberDetail } from '@/common/types/member';
import apiInstance from './axios';
import { ApiServerResponse } from '@/common/types/apis';

const memberPath = 'nsc-member';

export const getNscMemberList = async () =>
  await apiInstance.get(`${memberPath}/list`);

export const getNscMemberInfo = async (email: string) =>
  await apiInstance.get(`${memberPath}/${email}`);

export const createNscMember = async (data: MemberDetail) =>
  await apiInstance.post<ApiServerResponse<MemberDetail>>(
    `${memberPath}`,
    data,
  );

export const updateNscMember = async (data: MemberDetail, email: string) =>
  await apiInstance.put<ApiServerResponse<MemberDetail>>(
    `${memberPath}/${email}`,
    data,
  );

export const deleteNscmembers = async (
  nscEmailToDelete: (string | undefined)[],
) => {
  await apiInstance.delete<ApiServerResponse<MemberDetail>>(`${memberPath}`, {
    data: { emails: nscEmailToDelete },
  });
};

export const getMemberInfoByToken = async () =>
  await apiInstance.get(`${memberPath}`);
