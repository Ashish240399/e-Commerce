import Image from "next/image";
import React from "react";
import AddRemoveFromCartButton from "./AddRemoveFromCartButton";

type props = {
  cartItem: CartItemType;
  addToCart: Function;
  removeFromCart: Function;
  cartContext: any;
};

const CartItem = ({
  cartItem,
  addToCart,
  removeFromCart,
  cartContext,
}: props) => {
  function addToCartCallback() {
    addToCart(cartItem.id, cartContext);
  }
  function removeFromCartCallback() {
    removeFromCart(cartItem.id, cartContext);
  }
  return (
    <div className="w-[100%] flex justify-between items-center gap-[10%] my-6 py-2 border-b-2 border-b-[#80808075]">
      <div className="flex items-start gap-4 w-[80%]">
        <div className="">
          <Image alt="" src={cartItem?.image} width={100} height={100} />
        </div>
        <div>
          <div>{cartItem.title}</div>
          <div>{cartItem.product_type}</div>
          <div>{cartItem.price}</div>
        </div>
      </div>

      <div className="w-[10%]">
        <AddRemoveFromCartButton
          addFunction={addToCartCallback}
          removeFunction={removeFromCartCallback}
          value={cartItem.quantity}
        />
      </div>
    </div>
  );
};

export default CartItem;
