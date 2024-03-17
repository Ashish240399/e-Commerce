"use client";
import { CartContext } from "@/context/cartContext/cartContext";
import { ProductContext } from "@/context/productContext/productContext";
import { getCart } from "@/services/getCart";
import { getProducts } from "@/services/getProducts";
import { getTokenFromLocalStorage } from "@/utils/getTokenFromLocalStorage";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

function MainPageLayout({ children }: { children: React.ReactNode }) {
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const token = getTokenFromLocalStorage();
  async function getProductsFn() {
    try {
      const response = await getProducts();
      productContext?.setProducts(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCartFn() {
    try {
      const response = await getCart(token);
      cartContext?.setCart(response);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    getProductsFn();
    if (token.length > 0) {
      getCartFn();
    }
  }, []);
  return <div>{children}</div>;
}

export default MainPageLayout;
