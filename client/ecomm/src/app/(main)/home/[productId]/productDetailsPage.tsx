"use client";
import AddRemoveFromCartButton from "@/components/AddRemoveFromCartButton";
import Buttons from "@/components/Buttons";
import { CartContext } from "@/context/cartContext/cartContext";
import { ProductContext } from "@/context/productContext/productContext";
import { addToCart } from "@/services/addToCart";
import { getCartFn } from "@/utils/getCart";
import { getTokenFromLocalStorage } from "@/utils/getTokenFromLocalStorage";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  productId: number;
};

const ProductDetailsPage = (props: Props) => {
  const productList = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const token = getTokenFromLocalStorage();
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );
  useEffect(() => {
    if (productList) {
      for (let i = 0; i < productList?.products.length; i++) {
        if (productList?.products[i].id == props.productId) {
          setProductDetails(productList?.products[i]);
        }
      }
    }
  }, []);

  async function addToCartFn() {
    try {
      const response = await addToCart(productDetails?.id as number, token);
      cartContext?.addCartCount();
      getCartFn(token, cartContext);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Image
        alt="product img"
        src={productDetails?.image as string}
        width={400}
        height={400}
      />
      <div>{productDetails?.title}</div>
      <div>{productDetails?.description}</div>
      <div>{productDetails?.price}</div>
      <div className="flex items-end justify-between w-[100%] gap-3">
        {/* {productDetails. ? (
            <AddRemoveFromCartButton
              addFunction={addToCartFn}
              removeFunction={removeFromCartFn}
              value={cartValue}
            />
          ) : (
            <Buttons
              action={token.length != 0 ? addToCartFn : goToLoginPage}
              bg="#15F5BA"
              text="Add To Cart"
            />
          )} */}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
