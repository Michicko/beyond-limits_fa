import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import React from "react";
import clsx from "clsx";
import ImageComp from "@/components/ImageComp/ImageComp";
import styles from "./Competitions.module.css";
import Link from "next/link";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { getFirstLetter } from "@/lib/helpers";

async function Competitions() {
  const date = new Date();
  const year = date.getUTCFullYear();

  const { data: competitions, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        season: {
          contains: `${year}`,
        },
      },
      authMode: (await isAuthenticated()) ? "userPool" : "iam",
      selectionSet: ["id", "logo", "name"],
    });

  return (
    <CompetitionsLayout pageTitle="Competitions">
      <div className={clsx(styles.competitions)}>
        {competitions.map((competition) => {
          return (
            <Link
              className={clsx(styles.competition)}
              key={competition.id}
              href={`/competitions/${competition.id}`}
            >
              <div className={clsx(styles["competition__logo-box"])}>
                <ImageComp
                  alt={competition.name}
                  image={competition.logo}
                  placeholder={competition.logo}
                  priority={false}
                />
              </div>
              <p className={clsx(styles.competition__name, styles.short)}>
                {getFirstLetter(competition.name)}
              </p>
              <p className={clsx(styles.competition__name, styles.long)}>
                {competition.name}
              </p>
              <div className={clsx(styles["competition-icon__box"])}>
                <p>View</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 512 404.39"
                >
                  <path
                    fillRule="nonzero"
                    d="M438.95 219.45 0 219.99v-34.98l443.3-.55L269.8 25.79 293.39 0 512 199.92 288.88 404.39l-23.59-25.8z"
                  />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </CompetitionsLayout>
  );
}

export default Competitions;
