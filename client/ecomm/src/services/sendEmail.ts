import axios from "axios";

export async function sendEmail(email: string) {
  const response = await axios.post("http://localhost:8000/email/", {
    email: email,
  });
  return response.data;
}
