import axios from "axios";

export const register = async (formDetails: RegisterType) => {
  const response = await axios.post(
    "http://localhost:8000/auth/register/",
    formDetails
  );
  return response.data;
};
