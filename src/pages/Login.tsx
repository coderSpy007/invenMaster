import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  code: string;
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    email_verified_at: string | null;
    firstname: string;
    lastname: string;
    role: string;
    created_at: string | null;
    updated_at: string | null;
  };
}

interface Response {
  code: string;
  message: string;
}

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await authService.login(username, password);

    if ((result as Response).code == "success") {
      const loginData = result as LoginResponse;
      setSuccessMessage((result as Response).message);
      console.log(loginData);
      localStorage.setItem("authToken", loginData.token);
      localStorage.setItem("id", loginData.user.id.toString());
      localStorage.setItem("username", loginData.user.username);
      navigate("/home");
    } else {
      setErrorMessage((result as Response).message);
      console.log((result as Response).message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen px-[2rem]">
        <div className="bg-white h-auto md:h-[30rem] w-full max-w-[50rem] rounded-[1rem] flex flex-col md:flex-row">
          {/* Left */}
          <div className="h-[15rem] md:h-[30rem] w-full md:w-[25rem] bg-lightgrey rounded-t-[1rem] md:rounded-e-none md:rounded-s-[1rem]"></div>

          {/* Right */}
          <div className="h-auto md:h-[30rem] w-full md:w-[25rem] rounded-b-[1rem] md:rounded-b-none md:rounded-e-[1rem] flex flex-col justify-center items-center p-4 mb-[2rem]">
            <h5 className="font-bold text-xl">Welcome Again!</h5>
            <input
              className="bg-lightgrey-2 mt-[2rem] w-full max-w-[16rem] h-[3rem] rounded-[10px] ps-[1rem] text-xs"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="bg-lightgrey-2 mt-[1rem] w-full max-w-[16rem] h-[3rem] rounded-[10px] ps-[1rem] text-xs"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue mt-[2rem] w-full max-w-[16rem] h-[2.5rem] rounded-[2rem] text-xs"
              onClick={handleLogin}
            >
              Login
            </button>

            {errorMessage ? (
              <p className="text-red-500 mt-2 text-xs text-center">
                {errorMessage}
              </p>
            ) : successMessage ? (
              <p className="text-green-500 mt-2 text-xs text-center">
                {successMessage}
              </p>
            ) : null}

            <p className="mt-[1rem] text-xs text-center">
              Don't have an account yet? <a className="font-bold">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
