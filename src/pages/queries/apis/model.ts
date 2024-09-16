import apiInstance from './axios';

const modelPath = 'v-model';

export const getModelList = async () =>
  await apiInstance.get<any[]>(`${modelPath}/list`);

export const getModelListByModelCode = async (modelCode: string) =>
  await apiInstance.get<any>(`${modelPath}/${modelCode}`);

export const deleteModelList = async (body: Object) => {
  await apiInstance.delete(`${modelPath}`, { data: body });
};

export const addModelList = async (body: any) =>
  await apiInstance.post(`${modelPath}`, body, {
    headers: { 'Contest-Type': 'multipart/form-data' },
  });

export const updateModelList = async (body: any) =>
  await apiInstance.put(`${modelPath}`, body, {
    headers: { 'Contest-Type': 'multipart/form-data' },
  });
