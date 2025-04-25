"use client";
import React, { createContext, useContext } from "react";

interface IPageContext {
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
  pageBg: string;
  setPageBg: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const PageContext = createContext<IPageContext>({
  pageTitle: "",
  setPageTitle: () => {},
  pageBg: "",
  setPageBg: () => {},
  username: "",
  setUsername: () => {},
  loading: false,
});

export default PageContext;

export const usePageContext = () => {
  return useContext(PageContext);
};
