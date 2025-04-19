import Card from "@/components/main/Card/Card";
import CardBody from "@/components/main/Card/CardBody";
import CardHeader from "@/components/main/Card/CardHeader";
import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import Heading from "@/components/main/Typography/Heading";
import Text from "@/components/main/Typography/Text";
import React from "react";
import clsx from "clsx";
import styles from "./History.module.css";

function History() {
	return (
		<>
			<Header
				bg={"/images/ourhistory.jpg"}
				alt="2024 / 2025 ongoing campaign"
				overlay={true}
			>
				<LayoutHeader>
					<>
						<Heading color="white" level={1} letterCase="upper" type="primary">
							Our History
						</Heading>
					</>
				</LayoutHeader>
			</Header>
			<LayoutMain>
				<div className={clsx(styles.history)}>
					<Card theme={"trans"}>
						<>
							<CardHeader theme={"dark"} border={true} as="div">
								<div className={clsx(styles.history__heading)}>
									<Heading
										level={3}
										letterCase="upper"
										color="secondary"
										type="section"
									>
										About Us
									</Heading>
								</div>
							</CardHeader>
							<CardBody as="div" theme={"light"}>
								<div className={clsx(styles.history__body, styles.p)}>
									<Text
										color="white"
										size="base"
										cssStyles={{ lineHeight: "1.5" }}
									>
										Beyond Limits FA is the youth development program of Remo
										Stars Football Club based in Ikenne, Ogun State, Nigeria.
									</Text>
								</div>
							</CardBody>
						</>
					</Card>
					<Card theme={"trans"}>
						<>
							<CardHeader theme={"dark"} border={true} as="div">
								<div className={clsx(styles.history__heading)}>
									<Heading
										level={3}
										letterCase="upper"
										color="secondary"
										type="section"
									>
										Home
									</Heading>
								</div>
							</CardHeader>
							<CardBody as="div" theme={"light"}>
								<div className={clsx(styles.history__body, styles.p)}>
									<Text
										color="white"
										size="base"
										cssStyles={{ lineHeight: "1.2" }}
									>
										Remo Stars Stadium, Ikenne, Ogun state.
									</Text>
								</div>
							</CardBody>
						</>
					</Card>
					<Card theme={"trans"}>
						<>
							<CardHeader theme={"dark"} border={true} as="div">
								<div className={clsx(styles.history__heading)}>
									<Heading
										level={3}
										letterCase="upper"
										color="secondary"
										type="section"
									>
										Established
									</Heading>
								</div>
							</CardHeader>
							<CardBody as="div" theme={"light"}>
								<div className={clsx(styles.history__body, styles.p)}>
									<Text
										color="white"
										size="base"
										cssStyles={{ lineHeight: "1.2" }}
									>
										The club was established in 2022 and competes in the Nigeria
										National League.
									</Text>
								</div>
							</CardBody>
						</>
					</Card>
					<Card theme={"trans"}>
						<>
							<CardHeader theme={"dark"} border={true} as="div">
								<div className={clsx(styles.history__heading)}>
									<Heading
										level={3}
										letterCase="upper"
										color="secondary"
										type="section"
									>
										Founder
									</Heading>
								</div>
							</CardHeader>
							<CardBody as="div" theme={"light"}>
								<div
									className={clsx(
										styles.history__body,
										styles.p,
										styles["link-box"],
									)}
								>
									<Text
										color="white"
										size="base"
										cssStyles={{ lineHeight: "1.2" }}
									>
										Beyond Limits F.A. was founded in 2022 by
									</Text>
									<a
										href={"https://en.wikipedia.org/wiki/Kunle_Soname"}
										className={clsx(styles["history-link"])}
									>
										Kunle Soname.
									</a>
								</div>
							</CardBody>
						</>
					</Card>
				</div>
			</LayoutMain>
		</>
	);
}

export default History;
