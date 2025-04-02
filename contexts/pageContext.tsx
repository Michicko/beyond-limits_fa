"use client";
import React, { createContext, useContext } from "react";

interface IPageContext {
	pageTitle: string;
	setPageTitle: React.Dispatch<React.SetStateAction<string>>;
	pageBg: string;
	setPageBg: React.Dispatch<React.SetStateAction<string>>;
}

const PageContext = createContext<IPageContext>({
	pageTitle: "",
	setPageTitle: () => {},
	pageBg: "",
	setPageBg: () => {},
});

export default PageContext;

export const usePageContext = () => {
	return useContext(PageContext);
};
