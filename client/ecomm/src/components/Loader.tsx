"use client";
import { LoaderContext } from "@/context/loaderContext/loaderContext";
import React, { useContext } from "react";

type Props = {};

const Loader = (props: Props) => {
  const loaderContext = useContext(LoaderContext);
  return (
    <>
      {loaderContext?.loaderActive ? (
        <div>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-[70px] w-[70px] border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loader;
