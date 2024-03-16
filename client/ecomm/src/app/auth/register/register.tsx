"use client";
import Buttons from "@/components/Buttons";
import { checkOtp } from "@/services/checkOtp";
import { register } from "@/services/registerAPI";
import { sendEmail } from "@/services/sendEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  const router = useRouter();
  const [openOtpPop, setOpenOtpPop] = useState(false);
  const [otp, setOtp] = useState("");
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
    sendEmailFn();
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

  async function sendEmailFn() {
    try {
      const response = await sendEmail(registerForm.email);
      if (response.detail == "OTP sent to email") {
        setOpenOtpPop(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function verifyOtpFn() {
    try {
      const response = await checkOtp(registerForm.email, otp);
      if ((response.message = "OTP verified")) {
        setOpenOtpPop(false);
        registerFn();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-[90vh] flex items-center justify-center">
      {openOtpPop == false && (
        <div className="fixed w-[100vw] h-[100vh] bg-[#000000be] flex justify-center items-center">
          <div className="bg-primary p-[40px]  ">
            <p className="text-[24px] font-bold text-center">Enter OTP</p>
            <input
              className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent my-4"
              type="text"
              placeholder="OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <Buttons action={verifyOtpFn} bg="#15F5BA" text="Verify" />
          </div>
        </div>
      )}
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
