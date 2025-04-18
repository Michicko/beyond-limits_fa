import { IPlayer } from "@/lib/definitions";
import clsx from "clsx";
import styles from "./Player.module.css";
import ImageComp from "@/components/ImageComp/ImageComp";

const Player = ({
  player,
  handleOnClick,
}: {
  player: IPlayer;
  handleOnClick: (playerId: string) => void;
}) => {
  const playerStyles = {
    background: `url(/images/player-bg.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={playerStyles} className={clsx(styles.player)}>
      <div className={clsx(styles["player__img-box"])}>
        <ImageComp
          image={player.homeKit}
          alt={player.firstname}
          placeholder={"/images/player-bg.png"}
          priority={false}
        />
      </div>
      <div className={clsx(styles["player__body"])}>
        <div className={clsx(styles["player__info-box"])}>
          <div className={clsx(styles["player__position-tile"])}>
            <p>{player.position?.shortName}</p>
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
    </div>
  );
};

export default Player;
