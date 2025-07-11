import { IStandingRow } from "@/lib/definitions";
import React from "react";
import styles from "./Standing.module.css";
import clsx from "clsx";
import ImageComp from "@/components/ImageComp/ImageComp";
import Text from "../Typography/Text";

function StandingRow({
  row,
  showLongName,
}: {
  row: IStandingRow;
  showLongName: boolean;
}) {
  return (
    <>
      <td>{row.position}</td>
      <td
        colSpan={4}
        className={clsx(styles["with-child"], showLongName && styles["long"])}
        title={row.name}
      >
        <div className={styles["img-box"]}>
          {row.logo && <ImageComp image={row.logo} alt={`${row.name} logo`} />}
        </div>
        <Text color="white" letterCase="upper" size="base" weight="semibold">
          {row.shortName}
        </Text>
        {showLongName && (
          <Text color="white" letterCase="upper" size="base" weight="semibold">
            {row.name}
          </Text>
        )}
      </td>
      <td>{row.p}</td>
      <td>{row.w}</td>
      <td>{row.d}</td>
      <td>{row.l}</td>
      <td colSpan={2}>{row.g}</td>
      <td>{row.gd}</td>
      <td>{row.pts}</td>
    </>
  );
}

export default StandingRow;
