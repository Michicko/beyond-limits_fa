"use client";
import { IPlayer } from "@/lib/definitions";
import styles from "./Player.module.css";
import clsx from "clsx";
import Player from "./Player";
import { useState } from "react";
import PlayerModal from "./PlayerModal";
import Modal from "@/components/Modal/Modal";
import { getIcon } from "@/lib/icons";

const PlayerList = ({ players }: { players: IPlayer[] }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [isModalShown, setIsModalShown] = useState(false);

  const selectPlayer = (id: string) => {
    const player = players.find((player) => player.id === id);

    if (player) {
      setSelectedPlayer(player);
      setIsModalShown(true);
    }
  };

  const closeModal = () => {
    setIsModalShown(false);
  };

  return (
    <>
      {selectedPlayer && (
        <Modal isModalShown={isModalShown} setIsModalShown={setIsModalShown}>
          <div className={clsx(styles["player-modal"])}>
            <button onClick={closeModal} className={clsx("close-btn")}>
              {getIcon("close")}
            </button>
            <PlayerModal player={selectedPlayer} />
          </div>
        </Modal>
      )}
      <div className={clsx(styles.players)}>
        {players.map((player) => {
          return (
            <Player
              player={player}
              key={player.id}
              handleOnClick={selectPlayer}
            />
          );
        })}
      </div>
    </>
  );
};

export default PlayerList;
