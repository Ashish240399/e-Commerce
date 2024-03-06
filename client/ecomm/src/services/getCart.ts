import axios from "axios";

export const getCart = async (token: string) => {
  const response = await axios.get("http://localhost:8000/cart/allcart/", {
    headers: {
      Authorization: "Token " + token,
    },
  });
  return response.data;
};
