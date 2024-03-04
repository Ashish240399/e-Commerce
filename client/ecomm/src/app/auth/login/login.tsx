"use client";
import { getUserDetails } from "@/services/getUserDeatils";
import { login } from "@/services/loginAPI";
import React, { useState } from "react";

type Props = {};

const LoginPage = (props: Props) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginForm);
    loginFn();
  };

  async function loginFn() {
    try {
      const response = await login(loginForm.email, loginForm.password);
      console.log(response);
      getUser(response.token);
      localStorage.setItem("login-token", response.token);
    } catch (error: any) {
      console.log(error.response.data.detail);
    }
  }

  async function getUser(token: string) {
    try {
      const response = await getUserDetails(token);
      localStorage.setItem("user", JSON.stringify(response));
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[300px] p-4 bg-slate-500 flex flex-col gap-3 m-auto"
        action=""
      >
        <input
          className="text-black"
          name="email"
          onChange={handleChange}
          type="email"
        />
        <input
          className="text-black"
          name="password"
          onChange={handleChange}
          type="password"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoginPage;
