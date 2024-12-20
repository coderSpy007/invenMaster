import axios from "axios";
import { API_BASE_URL, CATEGORY_API_PATHS } from "../constants/apiPaths";

const saveCategory = async (id: number, categoryCode: string, categoryName: string): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_BASE_URL}${CATEGORY_API_PATHS.SAVE_CATEGORY}`,
      { id, categoryCode, categoryName }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error response:", error.response);
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};

const getListCategory = async (): Promise<string> => {
  try {
    const response = await axios.get<string>(`${API_BASE_URL}${CATEGORY_API_PATHS.GET_LIST_CATEGORY}`, {});
    return response.data;  
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};


const deleteListCategory = async (id: number): Promise<string> => {
  try {
    const response = await axios.delete<string>(`${API_BASE_URL}${CATEGORY_API_PATHS.DELETE_CATEGORY}`, 
    {
      data: { id }
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};



export default {saveCategory, getListCategory, deleteListCategory};
