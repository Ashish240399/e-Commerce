"use client";
import TransparentButton from "@/components/TransparentButton";
import { UserContext } from "@/context/userContext/userContext";
import React, { useContext } from "react";

type Props = {};

const Account = (props: Props) => {
  const userContext = useContext(UserContext);
  function logout() {
    localStorage.removeItem("login-token");
    localStorage.removeItem("user");
    userContext?.setUser(null);
    window.location.href = "/";
  }
  return (
    <div>
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
