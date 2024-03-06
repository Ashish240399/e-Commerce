"use client";

import ProductCard from "@/components/ProductCard";
import { ProductContext } from "@/context/productContext/productContext";
import { getProducts } from "@/services/getProducts";
import { getTokenFromLocalStorage } from "@/utils/getTokenFromLocalStorage";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

const ProductHomePage = (props: Props) => {
  const router = useRouter();
  const productContext = useContext(ProductContext);
  const token = getTokenFromLocalStorage();

  useEffect(() => {
    getProductsFn();
  }, []);

  async function getProductsFn() {
    try {
      const response = await getProducts();
      productContext?.setProducts(response);
    } catch (error) {
      console.log(error);
    }
  }

  function getProductDetails(id: number) {
    router.push("/home/" + id);
  }
  return (
    <div>
      <div className="w-[90%] m-auto grid grid-cols-4 gap-3">
        {productContext?.products.map((product: ProductType) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              productDetailsFn={getProductDetails}
              token={token}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHomePage;
