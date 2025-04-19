import styles from "./Nav.module.css";
import clsx from "clsx";

const NavMenuBtn = ({
  handleTabClick,
  activeTab,
  link,
  index,
}: {
  handleTabClick: (index: number) => void;
  activeTab: number;
  index: number;
  link: {
    icon: React.ReactNode;
    name: string;
  };
}) => {
  return (
    <button
      className={clsx(styles.btn, {
        [styles.active]: activeTab === index,
      })}
      onClick={() => handleTabClick(index)}
    >
      {link.icon}
      {link.name}
    </button>
  );
};

export default NavMenuBtn;
