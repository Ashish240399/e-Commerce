import Image from "next/image";
import React from "react";
import AddRemoveFromCartButton from "./AddRemoveFromCartButton";

type props = {
  cartItem: CartItemType;
  addToCart: Function;
  removeFromCart: Function;
};

const CartItem = ({ cartItem, addToCart, removeFromCart }: props) => {
  function addToCartCallback() {
    addToCart(cartItem.id);
  }
  function removeFromCartCallback() {
    removeFromCart(cartItem.id);
  }
  return (
    <div className="w-[100%] flex justify-between items-center gap-[10%] my-6 py-2 border-b-2 border-b-[#80808075]">
      <div className="flex items-start gap-4 w-[80%]">
        <Image alt="" src={cartItem?.image} height={100} width={100} />
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
