import { IPlayer } from "@/lib/definitions";
import React from "react";
import styles from "./Player.module.css";
import clsx from "clsx";
import PlayerInfo from "./PlayerInfo";
import { CldImage } from "next-cloudinary";

function PlayerModal({ player }: { player: IPlayer }) {
  return (
    <div className={clsx(styles["player-modal__box"])}>
      <div className={clsx(styles["player-kit"])}>
        {player.homeKit && (
          <CldImage
            fill
            src={player.homeKit}
            // removeBackground
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={`${player.firstname} ${player.lastname}`}
          />
        )}
        {player.awayKit && (
          <CldImage
            fill
            src={player.awayKit}
            // removeBackground
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={`${player.firstname} ${player.lastname}`}
          />
        )}
      </div>
      <div className={clsx(styles["player-modal__details"])}>
        <div className={clsx(styles["player-modal__name"])}>
          <p className={clsx(styles["player-modal__last"])}>
            {player.lastname}
          </p>
          <p className={clsx(styles["player-modal__first"])}>
            {player.firstname}
          </p>
        </div>
        <div className={clsx(styles["player-modal__infos"])}>
          {player.playerPosition && (
            <PlayerInfo
              info={{
                name: "Position",
                value: player.playerPosition.shortName,
              }}
            />
          )}
          {player.squadNo && (
            <PlayerInfo info={{ name: "Squad No", value: player.squadNo }} />
          )}
          {player.dob && (
            <PlayerInfo info={{ name: "DOB", value: player.dob }} />
          )}
          {player.dominantFoot && (
            <PlayerInfo info={{ name: "foot", value: player.dominantFoot }} />
          )}
          {player.height && (
            <PlayerInfo
              info={{ name: "height", value: `${player.height} cm` }}
            />
          )}
          {player.weight && (
            <PlayerInfo
              info={{ name: "weight", value: `${player.weight} kg` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerModal;
