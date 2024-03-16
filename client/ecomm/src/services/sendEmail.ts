import axios from "axios";

export async function sendEmail(email: string, username: string) {
  const response = await axios.post("http://localhost:8000/email/", {
    email: email,
    username: username,
  });
  return response.data;
}
