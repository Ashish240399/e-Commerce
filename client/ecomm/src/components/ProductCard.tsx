import Image from "next/image";
import React from "react";
import Buttons from "./Buttons";
import config from "../../tailwind.config";

type Props = {
  product: ProductType;
  productDetailsFn: Function;
};

function ProductCard({ product, productDetailsFn }: Props) {
  function setProductDetails() {
    productDetailsFn(product.id);
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
        <div className="flex items-end justify-end w-[100%]">
          <Buttons action={setProductDetails} bg="#15F5BA" text="Add To Cart" />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
