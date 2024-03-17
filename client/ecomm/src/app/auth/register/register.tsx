"use client";
import Buttons from "@/components/Buttons";
import Loader from "@/components/Loader";
import { LoaderContext } from "@/context/loaderContext/loaderContext";
import { checkOtp } from "@/services/checkOtp";
import { register } from "@/services/registerAPI";
import { sendEmail } from "@/services/sendEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {};

const RegisterPage = (props: Props) => {
  const router = useRouter();
  const loaderContext = useContext(LoaderContext);
  const [openOtpPop, setOpenOtpPop] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpErrorResponse, setOtpErrorResponse] = useState("");
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
    loaderContext?.setLoaderActive(true);
    sendEmailFn();
  };

  async function registerFn() {
    loaderContext?.setLoaderActive(true);
    try {
      const response = await register(registerForm);
      console.log(response);
      loaderContext?.setLoaderActive(false);
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error.response.data);
      loaderContext?.setLoaderActive(false);
    }
  }

  async function sendEmailFn() {
    try {
      const response = await sendEmail(
        registerForm.email,
        registerForm.username
      );
      loaderContext?.setLoaderActive(false);
      if (response.detail == "OTP sent to email") {
        setOtpErrorResponse("");
        setOpenOtpPop(true);
      }
    } catch (error) {
      loaderContext?.setLoaderActive(false);
      setOtpErrorResponse("");
      console.log(error);
    }
  }

  async function verifyOtpFn() {
    loaderContext?.setLoaderActive(true);
    try {
      const response = await checkOtp(registerForm.email, otp);
      loaderContext?.setLoaderActive(false);
      if ((response.message = "OTP verified")) {
        setOpenOtpPop(false);
        setOtpErrorResponse("");
        registerFn();
      }
    } catch (error: any) {
      loaderContext?.setLoaderActive(false);
      setOtpErrorResponse(error.response.data.message);
      console.log(error);
    }
  }
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <Loader />
      {openOtpPop == true && (
        <div className="fixed w-[100vw] h-[100vh] bg-[#000000be] flex justify-center items-center">
          <div className="bg-primary p-[40px] rounded-lg">
            <div className="text-[24px] font-bold text-center flex items-center justify-between">
              <div>Enter OTP</div>

              <div
                className="cursor-pointer"
                onClick={() => {
                  setOpenOtpPop(false);
                  setOtpErrorResponse("");
                }}
              >
                <IoMdClose />
              </div>
            </div>
            <div className="text-[12px] w-[80%]">
              An OTP has been sent to your email address to verify.
            </div>
            <input
              className="bg-[transparent] text-text border border-secondary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent my-4 w-full"
              type="text"
              placeholder="Email OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-between items-center text-[#ff3b3b] text-[12px] px-1 mb-2">
              <div
                onClick={() => {
                  loaderContext?.setLoaderActive(true);
                  sendEmailFn();
                }}
                className="text-white cursor-pointer"
              >
                Resend OTP
              </div>
              {otpErrorResponse}
            </div>
            <Buttons
              action={verifyOtpFn}
              bg={otp.length == 0 ? "gray" : "#15F5BA"}
              text="Verify"
            />
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
