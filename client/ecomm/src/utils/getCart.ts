import { getCart } from "@/services/getCart";

export async function getCartFn(token: string, cartContext: any) {
  try {
    const response = await getCart(token);
    cartContext.setCart(response);
    return response;
  } catch (error: any) {
    console.log(error.response.data);
  }
}
