"use client";
import useUpdatePageTitle from "@/hooks/useUpdatePageTitle";
import React from "react";

function PageTitle({ pageTitle }: { pageTitle: string }) {
	useUpdatePageTitle(pageTitle);
	return <></>;
}

export default PageTitle;
