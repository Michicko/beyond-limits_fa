"use client";
import PageContext from "@/contexts/pageContext";
import React, { useState } from "react";

function PageProvider({ children }: { children: React.ReactNode }) {
	const [pageTitle, setPageTitle] = useState("");
	const [pageBg, setPageBg] = useState("");
	return (
		<PageContext.Provider
			value={{ pageTitle, setPageTitle, pageBg, setPageBg }}
		>
			{children}
		</PageContext.Provider>
	);
}

export default PageProvider;
