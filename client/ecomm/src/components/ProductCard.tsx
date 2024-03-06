import Image from "next/image";
import React from "react";
import Buttons from "./Buttons";
import { addToCart } from "@/services/addToCart";
import TransparentButton from "./TransparentButton";

type Props = {
  product: ProductType;
  productDetailsFn: Function;
  token: string;
};

function ProductCard({ product, productDetailsFn, token }: Props) {
  function setProductDetails() {
    productDetailsFn(product.id);
  }

  async function addToCartFn() {
    try {
      const response = await addToCart(product.id, token);
      console.log(response);
    } catch (error) {
      console.log(error);
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
          <Buttons action={addToCartFn} bg="#15F5BA" text="Add To Cart" />
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
