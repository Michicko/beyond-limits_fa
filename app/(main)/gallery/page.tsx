import { visuals } from "@/lib/placeholder-data";
import React from "react";
import styles from "./Gallery.module.css";
import clsx from "clsx";
import ImageComp from "@/components/ImageComp/ImageComp";

function Gallery() {
	return (
		<div className={clsx(styles.gallery)}>
			{visuals.map((visual) => {
				return (
					<div className={clsx(styles.visual)} key={visual}>
						<ImageComp
							image={visual}
							alt=""
							placeholder="visual"
							priority={false}
							key={visual}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default Gallery;
