import { addToCart } from "@/services/addToCart";
import { getCartFn } from "./getCart";
import { getTokenFromLocalStorage } from "./getTokenFromLocalStorage";

export async function addToCartFn(id: number, cartContext: any) {
  const token = getTokenFromLocalStorage();
  try {
    const response = await addToCart(id, token);
    cartContext?.addCartCount();
    getCartFn(token, cartContext);
  } catch (error) {
    console.log(error);
  }
}
