import axios from "axios";

export const deleteCart = async (token: string) => {
  const response = await axios.delete(
    "http://localhost:8000/cart/deleteCart/",
    {
      headers: {
        Authorization: "Token " + token,
      },
    }
  );
  return response.data;
};
