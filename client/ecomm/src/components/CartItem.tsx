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
    <div>
      <Image alt="" src={cartItem?.image} height={100} width={100} />
      <div className="w-[200px]">
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
