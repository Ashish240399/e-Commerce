import React from "react";
import ProductDetailsPage from "./productDetailsPage";

function ProductDetails({ params }: { params: { productId: string } }) {
  const productId = params.productId;
  return (
    <div>
      <ProductDetailsPage productId={+productId} />
    </div>
  );
}

export default ProductDetails;
