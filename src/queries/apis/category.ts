import apiInstance from './axios';

const categoryList = 'v-category-code';

const getCategoryList = async () =>
  await apiInstance.get<any[]>(`${categoryList}/list`);

export default getCategoryList;

export const addCategoryList = async () =>
  await apiInstance.post(`${categoryList}`);

export const updateCategoryList = async (body: any) =>
  await apiInstance.put(`${categoryList}`, body);

export const deleteCategoryList = async (categoryCode: string) =>
  await apiInstance.delete(`${categoryList}/${categoryCode}`);
