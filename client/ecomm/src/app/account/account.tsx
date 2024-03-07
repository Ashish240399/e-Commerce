"use client";
import Buttons from "@/components/Buttons";
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
      <Buttons action={logout} bg="#15F5BA" text="Logout" />
    </div>
  );
};

export default Account;
