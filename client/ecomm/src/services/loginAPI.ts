import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:8000/auth/login/", {
    email: email,
    password: password,
  });
  return response.data;
};
