import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import Heading from "@/components/main/Typography/Heading";
import React from "react";
import clsx from "clsx";
import styles from "./Contact.module.css";

function Contact() {
	return (
		<>
			<>
				<Header
					bg={"/images/contact.jpg"}
					alt="2024 / 2025 Stats"
					overlay={true}
				>
					<LayoutHeader>
						<Heading level={1} letterCase="upper" type="primary">
							Contact us
						</Heading>
					</LayoutHeader>
				</Header>
				<LayoutMain>
					<div className={clsx(styles["contact-container"])}>
						<div className={clsx(styles["contact-card"])}>
							<h2>WRITE TO US</h2>
							<p>
								Please send an email to:{" "}
								<a
									href="mailto:info@beyondlimitsfa.com"
									className={clsx(styles["contact-link"])}
								>
									info@beyondlimitsfa.com
								</a>
							</p>
						</div>
					</div>
				</LayoutMain>
			</>
		</>
	);
}

export default Contact;
