"use client";
import Loader from "@/components/Loader";
import TransparentButton from "@/components/TransparentButton";
import { LoaderContext } from "@/context/loaderContext/loaderContext";
import { UserContext } from "@/context/userContext/userContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

type Props = {};

const Account = (props: Props) => {
  const userContext = useContext(UserContext);
  const loaderContext = useContext(LoaderContext);
  const router = useRouter();
  function logout() {
    loaderContext?.setLoaderActive(true);
    localStorage.removeItem("login-token");
    localStorage.removeItem("user");
    router.push("/");
    location.reload();
  }
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      userContext?.setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      <Loader />
      <div>
        Name: {userContext?.user?.firstName + " " + userContext?.user?.lastName}
      </div>
      <div>Address: {userContext?.user?.address}</div>
      <div>Email: {userContext?.user?.email}</div>
      <div className="w-[200px]">
        <TransparentButton
          action={logout}
          borderColor="#15F5BA"
          text="Logout"
        />
      </div>
    </div>
  );
};

export default Account;
