"use client";

import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/getProducts";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const ProductHomePage = (props: Props) => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProductsFn();
  }, []);

  async function getProductsFn() {
    try {
      const response = await getProducts();
      setProducts(response);
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
        {products.map((product: ProductType) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              productDetailsFn={getProductDetails}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHomePage;
