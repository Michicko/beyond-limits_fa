import styles from "./Nav.module.css";
import clsx from "clsx";

const CloseBtn = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <button className={clsx(styles["close-btn"])} onClick={closeMenu}>
      <svg
        width="29"
        height="29"
        viewBox="0 0 41 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40.2092" height="40" rx="7" fill="#F8F7F7" />
        <path
          d="M28.1981 13.4783L26.5531 11.8333L20.0314 18.355L13.5097 11.8333L11.8647 13.4783L18.3864 20L11.8647 26.5217L13.5097 28.1667L20.0314 21.645L26.5531 28.1667L28.1981 26.5217L21.6764 20L28.1981 13.4783Z"
          fill="#339CFF"
        />
      </svg>
      <span>CLOSE</span>
    </button>
  );
};

export default CloseBtn;
