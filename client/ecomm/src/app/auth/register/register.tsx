"use client";
import { register } from "@/services/registerAPI";
import React, { useState } from "react";

type Props = {};

const RegisterPage = (props: Props) => {
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
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  return (
    <div>
      <form
        className="w-[300px] p-4 bg-slate-500 flex flex-col gap-3 m-auto"
        onSubmit={handleSubmit}
        action=""
      >
        <input
          className="text-black"
          onChange={handleChange}
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        <input
          className="text-black"
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
        <input
          className="text-black"
          onChange={handleChange}
          type="text"
          name="address"
          placeholder="Address"
        />
        <input
          className="text-black"
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className="text-black"
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="text-black"
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="Password"
        />
        <input onChange={handleChange} type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterPage;
