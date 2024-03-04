import React from "react";

type Props = {};

function ProductDetails({ params }: { params: { productId: string } }) {
  return <div>ProductDetails : {params.productId}</div>;
}

export default ProductDetails;
