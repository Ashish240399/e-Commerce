"use client";
import React, { createContext, useState } from "react";

type CartContextData = {
  cart: CartType[];
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>;
};

export const CartContext = createContext<CartContextData | null>(null);
export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartType[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
