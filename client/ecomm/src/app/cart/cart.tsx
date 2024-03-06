"use client";
import CartItem from "@/components/CartItem";
import { CartContext } from "@/context/cartContext/cartContext";
import { ProductContext } from "@/context/productContext/productContext";
import { addToCart } from "@/services/addToCart";
import { getCart } from "@/services/getCart";
import { removeFromCart } from "@/services/removeFromCart";
import { getTokenFromLocalStorage } from "@/utils/getTokenFromLocalStorage";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

const Cart = (props: Props) => {
  const cartContext = useContext(CartContext);
  const productList = useContext(ProductContext)?.products;
  const token = getTokenFromLocalStorage();
  const [cartList, setCartList] = useState<CartItemType[]>([]);

  useEffect(() => {
    getCartFn();
  }, []);
  async function getCartFn() {
    try {
      const response = await getCart(token);
      cartContext?.setCart(response);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    if (cartContext?.cart && productList) {
      console.log("line 31", cartContext?.cart.length);
      const cartArr: any = [];
      for (let i = 0; i < cartContext?.cart?.length; i++) {
        for (let j = 0; j < productList?.length; j++) {
          if (cartContext?.cart[i].productId == productList[j].id) {
            cartArr.push(productList[j]);
            cartArr[cartArr.length - 1].quantity =
              cartContext?.cart[i].quantity;
            break;
          }
        }
      }
      setCartList(cartArr);
    }
  }, [cartContext?.cart]);

  async function addToCartFn(id: number) {
    try {
      const response = await addToCart(id, token);
      console.log(response);
      getCartFn();
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromCartFn(id: number) {
    try {
      const response = await removeFromCart(id, token);
      console.log(response);
      getCartFn();
    } catch (error) {
      console.log(error);
    }
  }
  console.log(cartList);
  return (
    <div>
      {cartList.map((cartItem: CartItemType, id) => (
        <CartItem
          cartItem={cartItem}
          addToCart={addToCartFn}
          removeFromCart={removeFromCartFn}
          key={id}
        />
      ))}
    </div>
  );
};

export default Cart;
