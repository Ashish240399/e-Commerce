import { removeFromCart } from "@/services/removeFromCart";
import { getCartFn } from "./getCart";
import { getTokenFromLocalStorage } from "./getTokenFromLocalStorage";

export async function removeFromCartFn(id: number, cartContext: any) {
  const token = getTokenFromLocalStorage();
  try {
    const response = await removeFromCart(id, token);
    console.log(response);
    cartContext?.removeCartCount();
    getCartFn(token, cartContext);
  } catch (error) {
    console.log(error);
  }
}
