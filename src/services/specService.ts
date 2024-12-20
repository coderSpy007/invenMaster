import axios from "axios";
import { API_BASE_URL, SPEC_API_PATHS } from "../constants/apiPaths";

const saveSpec = async (id: number, categoryId: number, specValue: string): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_BASE_URL}${SPEC_API_PATHS.SAVE_SPEC}`,
      { id, categoryId, specValue }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error response:", error.response);
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};

const getListSpec = async (): Promise<string> => {
  try {
    const response = await axios.get<string>(`${API_BASE_URL}${SPEC_API_PATHS.GET_LIST_SPEC}`, {});
    return response.data;  
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};

const getCategoryId = async (): Promise<string> => {
  try {
    const response = await axios.get<string>(`${API_BASE_URL}${SPEC_API_PATHS.GET_CATEGORY_ID}`, {});
    return response.data;  
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};


const deleteListSpec = async (id: number): Promise<string> => {
  try {
    const response = await axios.delete<string>(`${API_BASE_URL}${SPEC_API_PATHS.DELETE_SPEC}`, 
    {
      data: { id }
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};



export default {saveSpec, getListSpec, getCategoryId, deleteListSpec};
