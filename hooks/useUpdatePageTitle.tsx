"use client";

import { usePageContext } from "@/contexts/pageContext";
import { useEffect } from "react";

function useUpdatePageTitle(title: string) {
	const { setPageTitle } = usePageContext();

	useEffect(() => {
		setPageTitle(title);
	}, [title]);
}

export default useUpdatePageTitle;
