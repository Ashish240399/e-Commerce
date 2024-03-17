"use client";
import Buttons from "@/components/Buttons";
import Loader from "@/components/Loader";
import { LoaderContext } from "@/context/loaderContext/loaderContext";
import { UserContext } from "@/context/userContext/userContext";
import { getUserDetails } from "@/services/getUserDeatils";
import { login } from "@/services/loginAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

type Props = {};

const LoginPage = (props: Props) => {
  const userContext = useContext(UserContext);
  const loaderContext = useContext(LoaderContext);
  const router = useRouter();
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
    loaderContext?.setLoaderActive(true);
    loginFn();
  };

  async function loginFn() {
    try {
      const response = await login(loginForm.email, loginForm.password);
      console.log(response);
      loaderContext?.setLoaderActive(false);
      localStorage.setItem("login-token", response.token);
      getUser(response.token);
    } catch (error: any) {
      console.log(error.response.data.detail);
      loaderContext?.setLoaderActive(false);
    }
  }

  async function getUser(token: string) {
    try {
      const response = await getUserDetails(token);
      localStorage.setItem("user", JSON.stringify(response));
      userContext?.setUser(response);
      router.push("/home");
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Loader />
      <form
        onSubmit={handleSubmit}
        className="w-[300px] p-4 bg-slate-500 flex flex-col gap-3 m-auto"
        action=""
      >
        <p className="text-[24px] font-bold">Login</p>
        <div className="mb-[-5%] text-[13px] text-smalltext">Email</div>
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          name="email"
          onChange={handleChange}
          type="email"
        />
        <div className="mb-[-5%] text-[13px] text-smalltext">Password</div>
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          name="password"
          onChange={handleChange}
          type="password"
        />
        <div className="mt-[8%]">
          <Buttons action={handleSubmit} bg="#15F5BA" text="Login" />
        </div>

        {/* <input type="submit" value="Submit" /> */}
        <p className="text-smalltext text-[13px] text-end">
          {"Don't"} have an account?{" "}
          <Link href="/auth/register" className="text-secondary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
