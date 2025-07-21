import clsx from "clsx";
import React from "react";
import styles from "./Honors.module.css";
import { Nullable } from "@/lib/definitions";
import Button from "@/components/main/Button/Button";
import ImageComp from "@/components/ImageComp/ImageComp";

interface IHonor {
  longName: string;
  trophiesWon: Nullable<number>;
  trophyArticleId: Nullable<string>;
  yearsWon: Nullable<string>;
  trophyImage: string;
  id: string;
}

function Honour({
  honor,
  stats,
}: {
  honor: IHonor;
  stats: {
    numbersWon: number;
    seasonsWon: string[];
  };
}) {
  return (
    <div key={honor.longName} className={clsx(styles.honor)}>
      <div className={clsx(styles["honor-img__box"])}>
        <div className={clsx(styles["honor-img"])}>
          <ImageComp
            alt={honor.longName}
            image={honor.trophyImage}
            placeholder={honor.trophyImage}
            priority={false}
          />
        </div>
        <h3 className={clsx(styles["honors-won"])}>
          {stats.numbersWon + (honor.trophiesWon || 0)}
        </h3>
      </div>
      {stats && (
        <div className={clsx(styles["honor-details"])}>
          <h3 className={clsx(styles["honor-name"])}>{honor.longName}</h3>
          <ul className={clsx(styles["honors-years"])}>
            {Array.from(
              new Set([
                ...(honor.yearsWon?.trim().split(",") || []),
                ...stats.seasonsWon,
              ])
            ).map((season, i) => {
              return (
                <li className={clsx(styles["honor-year"])} key={season}>
                  {season}
                  {i < stats.seasonsWon.length - 1 ? "," : ""}{" "}
                </li>
              );
            })}
          </ul>
          <Button
            isLink={true}
            text={"Learn more"}
            url={
              !honor.trophyArticleId ? "#" : `/news/${honor.trophyArticleId}`
            }
            type="secondary"
            size="lg"
          />
        </div>
      )}
    </div>
  );
}

export default Honour;
