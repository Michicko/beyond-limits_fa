import React from "react";
import clsx from "clsx";
import styles from "./socials.module.css";
import ShareButton from "../Button/ShareButton";

function SocialShareLinks({ url, text }: { url: string; text: string }) {
	const links = [
		{
			name: "facebook",
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				url,
			)}`,
		},
		{
			name: "twitter",
			href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
				url,
			)}&text=${encodeURIComponent(text)}`,
		},
		// {
		// 	name: "whatsapp",
		// 	href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
		// 		text + " " + url,
		// 	)}`,
		// 	icon: ''
		// },
	];
	return (
		<div className={clsx(styles["social-share-links"])}>
			{links.map((link) => {
				return <ShareButton name={link.name} href={link.href} />;
			})}
		</div>
	);
}

export default SocialShareLinks;
