"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Buttons from "./Buttons";
import { addToCart } from "@/services/addToCart";
import TransparentButton from "./TransparentButton";
import AddRemoveFromCartButton from "./AddRemoveFromCartButton";
import { removeFromCart } from "@/services/removeFromCart";
import { CartContext } from "@/context/cartContext/cartContext";
import { getCart } from "@/services/getCart";

type Props = {
  product: ProductType;
  productDetailsFn: Function;
  token: string;
  cartValue?: number;
};

function ProductCard({ product, productDetailsFn, token, cartValue }: Props) {
  const cartContext = useContext(CartContext);
  function setProductDetails() {
    productDetailsFn(product.id);
  }

  async function addToCartFn() {
    try {
      const response = await addToCart(product.id, token);
      cartContext?.addCartCount();
      getCartFn();
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromCartFn() {
    try {
      const response = await removeFromCart(product.id, token);
      cartContext?.removeCartCount();
      getCartFn();
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
  return (
    <div className="bg-cardColor rounded-lg overflow-hidden h-[500px]">
      <div className="w-full h-[]">
        <div className="relative w-full h-[300px] pb-full">
          <Image
            alt="product image"
            src={product.image}
            layout="fill"
            objectFit="fit-content"
          />
        </div>
      </div>

      <div className="p-[10px] flex flex-col justify-between items-center h-[200px]">
        <div>
          <div className="text-text h-[55px] overflow-hidden text-[17px]">
            {product.title}
          </div>
          <div className="text-[12px] text-smalltext h-[55px]">
            {product.description.length > 100 ? (
              <span>
                {product.description.substring(0, 100) + ".. "}
                <span className="text-secondary">more</span>
              </span>
            ) : (
              product.description
            )}
          </div>
          <div className="font-bold text-[14px]">${product.price}</div>
        </div>
        <div className="flex items-end justify-between w-[100%] gap-3">
          {cartValue ? (
            <AddRemoveFromCartButton
              addFunction={addToCartFn}
              removeFunction={removeFromCartFn}
              value={cartValue}
            />
          ) : (
            <Buttons action={addToCartFn} bg="#15F5BA" text="Add To Cart" />
          )}

          <TransparentButton
            action={setProductDetails}
            borderColor="#15F5BA"
            text="Details"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
