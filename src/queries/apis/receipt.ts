import axios from 'axios';
import receiptApiInstance from './axios/receipt';

const receiptPath = 'receipt';

export const getReceiptList = async (year: string, month: string) =>
  await receiptApiInstance.get(
    `${receiptPath}/list/yearAndMonth?searchValue=&year=${year}&month=${month}&page=1&limit=10`,
  );

export const getReceiptListByAdmin = async (year: string, month: string) =>
  await receiptApiInstance.get(
    `${receiptPath}/admin/list/yearAndMonth?searchValue=&year=${year}&month=${month}&page=1&limit=10`,
  );

export const getReceiptDetailById = async (_id: string) =>
  await receiptApiInstance.get<any>(`${receiptPath}/detail/${_id}`);

export const downloadReceiptExcel = async (body: Object) => {
  return await receiptApiInstance.post(`${receiptPath}/download/excel`, body);
};

export const addReceipt = async (body: any) =>
  await receiptApiInstance.post(`${receiptPath}/upload`, body, {
    headers: { 'Contest-Type': 'multipart/form-data' },
  });

export const updateReceipt = async (body: any) =>
  await receiptApiInstance.put(`${receiptPath}`, body, {
    headers: { 'Contest-Type': 'multipart/form-data' },
  });

export const deleteReceipt = async (body: Object) => {
  await receiptApiInstance.delete(`${receiptPath}`, { data: body });
};
