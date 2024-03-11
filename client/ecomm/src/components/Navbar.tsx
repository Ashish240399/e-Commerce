"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { usePathname } from "next/navigation";
import { UserContext } from "@/context/userContext/userContext";

const Navbar = () => {
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext?.user) {
      setUserDetails(userContext.user);
    }
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, [userContext]);
  return (
    <div className="bg-primary text-text flex justify-between items-center px-[2.5%] h-[70px]">
      <div className="flex gap-1 items-center justify-center">
        <Image src={logo} width={70} height={70} alt="Company Logo" />
        <span className="text-sky-400">Ecommerce</span>
      </div>
      <div className="flex items-center justify-center gap-[8vw] w-fit">
        <div className="w-fit relative">
          <Link href="/home">Home</Link>
          <div
            className={`${
              pathname.includes("/home")
                ? "h-[1px] rounded-lg w-full bg-secondary absolute top-[100%] left-0 transition-all"
                : "h-[1px] rounded-lg w-0 bg-secondary absolute top-[100%] left-0 transition-all"
            }`}
          ></div>
        </div>
        <div className="w-fit relative">
          <Link href="/category">Category</Link>
          <div
            className={`${
              pathname == "/category"
                ? "h-[1px] rounded-lg w-full bg-secondary absolute top-[100%] left-0 transition-all"
                : "h-[1px] rounded-lg w-0 bg-secondary absolute top-[100%] left-0 transition-all"
            }`}
          ></div>
        </div>
        <div className="w-fit relative">
          <Link href="/cart">Cart</Link>
          <div
            className={`${
              pathname == "/cart"
                ? "h-[1px] rounded-lg w-full bg-secondary absolute top-[100%] left-0 transition-all"
                : "h-[1px] rounded-lg w-0 bg-secondary absolute top-[100%] left-0 transition-all"
            }`}
          ></div>
        </div>
        <div className="w-fit relative">
          {!userDetails ? (
            <div>
              <Link href="/auth/login">Login</Link>
              <div
                className={`${
                  pathname == "/auth/login"
                    ? "h-[1px] rounded-lg w-full bg-secondary absolute top-[100%] left-0 transition-all"
                    : "h-[1px] rounded-lg w-0 bg-secondary absolute top-[100%] left-0 transition-all"
                }`}
              ></div>
            </div>
          ) : (
            <div>
              <Link href={"/account"}>{userDetails.firstName}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
