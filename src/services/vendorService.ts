import axios from "axios";
import { API_BASE_URL, VENDOR_API_PATHS} from "../constants/apiPaths";

const saveVendor = async (id: number, vendorCode: string, vendorName: string, address: string, email: string, phoneNumber: string, storeId:number): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_BASE_URL}${VENDOR_API_PATHS.SAVE_VENDOR}`,
      { id, vendorCode, vendorName, address, email, phoneNumber, storeId }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error response:", error.response);
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};

const getListVendor = async (storeId: number): Promise<string> => {
    try {
      const response = await axios.get<string>(`${API_BASE_URL}${VENDOR_API_PATHS.GET_LIST_VENDOR}`, {
        params: { store_id: storeId }  
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message || "An error occurred. Please try again.";
    }
  };
  


const deleteListVendor = async (id: number): Promise<string> => {
  try {
    const response = await axios.delete<string>(`${API_BASE_URL}${VENDOR_API_PATHS.DELETE_VENDOR}`, 
    {
      data: { id }
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};



export default {saveVendor, getListVendor, deleteListVendor};
