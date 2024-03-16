import axios from "axios";

export async function checkOtp(email: string, otp: string) {
  const response = await axios.post("http://localhost:8000/otp/verify/", {
    email: email,
    otp: otp,
  });
  return response.data;
}
