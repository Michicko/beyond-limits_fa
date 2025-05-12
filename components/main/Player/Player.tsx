'use client';
import { IPlayer } from "@/lib/definitions";
import clsx from "clsx";
import styles from "./Player.module.css";
import { CldImage } from 'next-cloudinary';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Player = ({
  player,
  handleOnClick,
}: {
  player: IPlayer;
  handleOnClick: (playerId: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: "easeOut" }} 
      className={clsx(styles.player)}>
      <div className={clsx(styles["player__img-box"])}>
        {player.homeKit && (
          <CldImage
            fill
            src={player.homeKit}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={player.firstname}
          />
        )}
      </div>
      <div className={clsx(styles["player__body"])}>
        <div className={clsx(styles["player__info-box"])}>
          <div className={clsx(styles["player__position-tile"])}>
            <p>{player.playerPosition?.shortName}</p>
          </div>
          <div className={clsx(styles["player__info-box-inner"])}>
            <div className={clsx(styles["player__details"])}>
              <p className={clsx(styles.lastname)}>{player.lastname}</p>
              <p className={clsx(styles.firstname)}>{player.firstname}</p>
              <p className={clsx(styles.squad_no)}>{player.squadNo}</p>
            </div>
            <div className={clsx(styles.btn__box)}>
              <button
                type="button"
                className={clsx(styles.player__btn)}
                onClick={() => handleOnClick(player.id)}
              >
                View Profile
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Player;
