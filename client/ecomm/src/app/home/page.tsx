"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const HomePage = (props: Props) => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/home/12");
        }}
      >
        Got to product Details
      </button>
    </div>
  );
};

export default HomePage;
