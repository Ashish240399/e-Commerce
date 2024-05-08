"use client";

import ProductCard from "@/components/ProductCard";
import { CartContext } from "@/context/cartContext/cartContext";
import { ProductContext } from "@/context/productContext/productContext";
import { UserContext } from "@/context/userContext/userContext";
import { getProducts } from "@/services/getProducts";
import { getTokenFromLocalStorage } from "@/utils/getTokenFromLocalStorage";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';

type Props = {};

const ProductHomePage = (props: Props) => {
  const router = useRouter();
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const [productIdInCart, setProductIdInCart] = useState<number[]>([]);
  const [productQuantityInCart, setProductQuantityInCart] = useState<number[]>(
    []
  );
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
  useEffect(() => {
    if (cartContext?.cart) {
      console.log("calling set cart in use effect", cartContext.cart);
      const productIdArr: number[] = [];
      const productQuantityArr: number[] = [];
      for (let i = 0; i < cartContext?.cart.length; i++) {
        productIdArr.push(cartContext?.cart[i].productId);
        productQuantityArr.push(cartContext?.cart[i].quantity);
      }
      setProductIdInCart(productIdArr);
      setProductQuantityInCart(productQuantityArr);
    }
  }, [cartContext]);
  console.log(productContext?.products);
  return (
    <div>
      <div className="w-[90%] m-auto grid grid-cols-4 gap-3">
        {productContext?.products.length==0 ? new Array(20).fill(undefined).map((_,id)=>(<div key={id} className="h-[500px] bg-cardColor w-full rounded-lg">
          <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
          <div className="px-4">
            <Skeleton animation="wave" sx={{height:90,width:"100%"}} />
            <Skeleton animation="wave" sx={{height:30,width:"100%"}} />
            <Skeleton animation="wave" sx={{height:30,width:"100%"}} />
            <Skeleton animation="wave" sx={{height:30,width:"50%"}} />
          </div>
        </div>)): productContext?.products.map((product: ProductType) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              productDetailsFn={getProductDetails}
              token={token}
              cartValue={
                productIdInCart.includes(product.id)
                  ? productQuantityInCart[productIdInCart.indexOf(product.id)]
                  : 0
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHomePage;
