import axios from "axios";


const API_URL = "http://localhost:8000/api/store";

const getStore = async (user_id: number): Promise<string> => {
  try {
    const response = await axios.get<string>(API_URL, {
        params: {
            user_id: user_id,
        },
    });
    return response.data;  
  } catch (error: any) {
    return error.response?.data?.message || "An error occurred. Please try again.";
  }
};

export default { getStore };
