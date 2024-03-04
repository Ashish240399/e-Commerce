import axios from "axios";

export async function getUserDetails(token: string) {
  const response = await axios.get("http://localhost:8000/auth/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
}
