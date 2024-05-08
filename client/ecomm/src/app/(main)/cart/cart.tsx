"use client";
import Buttons from "@/components/Buttons";
import CartItem from "@/components/CartItem";
import { CartContext } from "@/context/cartContext/cartContext";
import { ProductContext } from "@/context/productContext/productContext";
import { getTokenFromLocalStorage } from "@/utils/getTokenFromLocalStorage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import logo from "../../../assets/images/logo.png";
import { useRouter } from "next/navigation";
import { getCartFn } from "@/utils/getCart";
import { addToCartFn } from "@/utils/addToCart";
import { removeFromCartFn } from "@/utils/removeFromCart";
import { LoaderContext } from "@/context/loaderContext/loaderContext";
import Loader from "@/components/Loader";

type Props = {};

const Cart = (props: Props) => {
  const router = useRouter();
  const loaderContext = useContext(LoaderContext);
  const cartContext = useContext(CartContext);
  const productList = useContext(ProductContext)?.products;
  const token = getTokenFromLocalStorage();
  const [cartList, setCartList] = useState<CartItemType[]>([]);
  const [Razorpay] = useRazorpay();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (token.length > 0) {
      console.log("line 32");
      getCartFn(token, cartContext);
    }
  }, []);

  useEffect(() => {
    if (cartContext?.cart && productList) {
      let totalCost = 0;
      console.log("line 31", cartContext?.cart.length);
      const cartArr: any = [];
      for (let i = 0; i < cartContext?.cart?.length; i++) {
        for (let j = 0; j < productList?.length; j++) {
          if (cartContext?.cart[i].productId == productList[j].id) {
            cartArr.push(productList[j]);
            cartArr[cartArr.length - 1].quantity =
              cartContext?.cart[i].quantity;
            totalCost += cartContext.cart[i].quantity * +productList[j].price;
            break;
          }
        }
      }
      setCartList(cartArr);
      cartContext.setTotalPrice(totalCost);
    }
  }, [cartContext?.cart]);

  async function checkOutFn() {
    loaderContext?.setLoaderActive(true);
    razorPay();
  }

  // complete order
  const complete_order = (
    paymentID: string,
    orderID: string,
    signature: string
  ) => {
    axios({
      method: "post",
      url: "http://localhost:8000/razorpay/order/complete/",
      data: {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount: Math.round(cartContext?.totalPrice || 0).toString() as string,
      },
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response) => {
        console.log(response.data);
        getCartFn(token, cartContext);
        alert("Order completed");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const razorPay = () => {
    //create order
    axios({
      method: "post",
      url: "http://localhost:8000/razorpay/order/create/",
      data: {
        amount: Math.round(cartContext?.totalPrice || 0).toString() as string,
        currency: "INR",
      },
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response: any) => {
        // get order id
        loaderContext?.setLoaderActive(false);
        var order_id = response.data.data.id;

        // handle payment
        const options = {
          key: "rzp_test_ibo3MeLmlOXQXe", // Enter the Key ID generated from the Dashboard
          name: "Ecommerce",
          amount: Math.round(cartContext?.totalPrice || 0).toString() as string,
          currency: "INR",
          description: "Test Transaction",
          image: logo.toString(),
          order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: function (response: any) {
            //complete order
            complete_order(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: "Ashish",
            email: "ashish@gmail.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      })
      .catch((error: any) => {
        console.log(error.response.data);
      });
  };

  function navigateToLogin() {
    router.push("/auth/login");
  }

  useEffect(()=>{
    setIsHydrated(true);
  },[])

  return (
    <div className="w-full">
    {!isHydrated ? <Loader /> : <div className="w-[100%] m-auto">
      <Loader />
      {token.length == 0 && (
        <div className="w-[50%] m-auto pt-[20%] flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl">
            Please login to see your cart
          </h1>
          <div className="w-[18%] mt-6">
            <Buttons action={navigateToLogin} bg="#15F5BA" text="Login" />
          </div>
        </div>
      )}
      {token.length > 0 && (
        <div className="w-full">
          <div className="h-[70vh] w-full overflow-auto px-[5%]">
            {cartList.map((cartItem: CartItemType, id) => (
              <CartItem
                cartItem={cartItem}
                addToCart={addToCartFn}
                removeFromCart={removeFromCartFn}
                cartContext={cartContext}
                key={id}
              />
            ))}
          </div>
          {cartContext?.totalCartCount == 0 && (
            <div className="fixed top-[55%] left-[45%] text-[20px] font-bold">
              Your Cart Is Empty Now
            </div>
          )}
          {cartList.length > 0 && (
            <div className="flex flex-col justify-end items-end mt-3 px-[5%]">
              <div>Total: {cartContext?.totalPrice.toFixed(2)}$</div>
              <div className="w-[20%]">
                <Buttons action={checkOutFn} bg="#15F5BA" text="Checkout" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>}
    
    </div>
  );
};

export default Cart;
