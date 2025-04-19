import styles from "./Tab.module.css";
import clsx from "clsx";

const Tab = ({
  theme,
  bg,
  children,
}: {
  theme: "theme-1" | "theme-2";
  bg: "trans" | "white";
  children: React.ReactElement;
}) => {
  return (
    <div className={clsx(styles.tab__container)}>
      <div className={clsx(styles["tab-list"], styles[bg], styles[theme])}>
        {children}
      </div>
    </div>
  );
};

export default Tab;
