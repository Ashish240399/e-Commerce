import axios from "axios";

export const addToCart = async (id: number, token: string) => {
  const response = await axios.post(
    "http://localhost:8000/cart/addToCart/",
    {
      product_id: id,
    },
    {
      headers: {
        Authorization: "Token " + token,
      },
    }
  );
  return response.data;
};
