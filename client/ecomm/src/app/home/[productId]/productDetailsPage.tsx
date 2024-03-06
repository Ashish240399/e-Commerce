"use client";
import { ProductContext } from "@/context/productContext/productContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  productId: number;
};

const ProductDetailsPage = (props: Props) => {
  const productList = useContext(ProductContext);
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

  function checkoutFn() {}

  return (
    <div>
      <Image
        alt="product img"
        src={productDetails?.image as string}
        width={100}
        height={100}
      />
    </div>
  );
};

export default ProductDetailsPage;
