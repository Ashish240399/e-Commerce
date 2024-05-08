"use client";
import React, { createContext, useEffect, useState } from "react";

type CartContextData = {
  cart: CartType[];
  totalCartCount: number;
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>;
  addCartCount: Function;
  removeCartCount: Function;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextData | null>(null);
export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartType[]>([]);
  const [totalCartCount, setTotalCartCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  function addCartCount() {
    setTotalCartCount(totalCartCount + 1);
  }

  function removeCartCount() {
    setTotalCartCount(totalCartCount - 1);
  }

  console.log("cart",cart);
  useEffect(()=>{
    let totalCount = 0;
    cart.forEach((item)=>{
      totalCount += item.quantity;
    })
    setTotalCartCount(totalCount);
  },[cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        totalCartCount,
        addCartCount,
        removeCartCount,
        setTotalPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
