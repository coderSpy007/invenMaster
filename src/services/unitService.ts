import axios from "axios";
import { API_BASE_URL, UNIT_API_PATHS } from "../constants/apiPaths";

const saveUnit = async (id: number, unitCode: string, unitName: string): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_BASE_URL}${UNIT_API_PATHS.SAVE_UNIT}`,
      { id, unitCode, unitName }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error response:", error.response);
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};

const getListUnit = async (): Promise<string> => {
  try {
    const response = await axios.get<string>(`${API_BASE_URL}${UNIT_API_PATHS.GET_LIST_UNIT}`, {});
    return response.data;  
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};


const deleteListUnit = async (id: number): Promise<string> => {
  try {
    const response = await axios.delete<string>(`${API_BASE_URL}${UNIT_API_PATHS.DELETE_UNIT}`, 
    {
      data: { id }
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};



export default {saveUnit, getListUnit, deleteListUnit};
