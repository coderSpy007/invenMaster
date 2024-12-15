import axios from "axios";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface ErrorResponse {
  message: string;
}

const API_URL = "http://localhost:8000/api/login";

const login = async (username: string, password: string): Promise<LoginResponse | ErrorResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, {
      username,
      password,
    });
    return response.data;  // Return the successful response data
  } catch (error: any) {
    // Handle error and return a custom error message
    return { message: error.response?.data?.message || "An error occurred. Please try again." };
  }
};

export default { login };
