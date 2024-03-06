import axios from "axios";

export const createOrder = async (token: string, paymentType: string) => {
  const response = await axios.post(
    "http://localhost:8000/orders/createOrder/",
    {
      paymentDetails: paymentType,
    },
    {
      headers: {
        Authorization: "Token " + token,
      },
    }
  );
  return response.data;
};
