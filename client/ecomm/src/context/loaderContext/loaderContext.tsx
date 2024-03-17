"use client";
import React, { createContext, useState } from "react";

type LoaderType = {
  loaderActive: boolean;
  setLoaderActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoaderContext = createContext<null | LoaderType>(null);

export const LoaderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loaderActive, setLoaderActive] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loaderActive, setLoaderActive }}>
      {children}
    </LoaderContext.Provider>
  );
};
