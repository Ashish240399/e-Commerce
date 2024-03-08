"use client";
import Buttons from "@/components/Buttons";
import { register } from "@/services/registerAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState<RegisterType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerForm);
    registerFn();
  };

  async function registerFn() {
    try {
      const response = await register(registerForm);
      console.log(response);
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <form
        className="w-[300px] p-4 bg-slate-500 flex flex-col gap-3 m-auto text-[14px]"
        onSubmit={handleSubmit}
        action=""
      >
        <p className="text-[24px] font-bold">Register</p>
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          onChange={handleChange}
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          onChange={handleChange}
          type="text"
          name="address"
          placeholder="Address"
        />
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="Password"
        />
        <div className="mt-[5%]">
          <Buttons action={handleSubmit} bg="#15F5BA" text="Register" />
        </div>
        <p className="text-smalltext text-[13px] text-end">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-secondary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
