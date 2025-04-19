import { useEffect, useState } from "react";
import MenuLinks from "./MenuLinks";
import NavMenuBtn from "./NavMenuBtn";
import CloseBtn from "./CloseBtn";
import clsx from "clsx";
import styles from "./Nav.module.css";
import NavMenuText from "./NavMenuText";
import NavMenuSubLinks from "./NavMenuSubLinks";
import { usePathname } from "next/navigation";

export default function NavMenu({
  setIsMenuOpened,
  isMenuOpened,
}: {
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const getIndex = () => {
    return MenuLinks.findIndex((el) => el.innerLinks.includes(pathname));
  };

  const [activeTab, setActiveTab] = useState(getIndex() < 0 ? 0 : getIndex());
  const currentMenu = MenuLinks[activeTab];

  // Function to change the active tab
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const closeMenu = () => {
    setIsMenuOpened(false);
  };

  const closeMenuOnMenuBoxClicked = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLDivElement;
    if (target === currentTarget) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpened]);

  return (
    <div
      className={clsx(styles["nav-menu__box"], {
        [styles.open]: isMenuOpened,
      })}
      onClick={closeMenuOnMenuBoxClicked}
    >
      <div className={clsx(styles["nav-menu"])}>
        <div className={styles["nav-menu__container"]}>
          <div className={styles["nav-menu__item"]}>
            {/* Close button now calls closeMenu */}
            <CloseBtn closeMenu={closeMenu} />
            {/* links */}
            <div className={styles["nav-menu__tab"]}>
              <div className={styles["nav-menu__links"]}>
                {MenuLinks.map((el, i) => {
                  const link = {
                    name: el.name,
                    icon: el.icon,
                  };
                  return (
                    <NavMenuBtn
                      link={link}
                      handleTabClick={handleTabClick}
                      activeTab={activeTab}
                      index={i}
                      key={el.id}
                    />
                  );
                })}
              </div>
              {/* sub menus */}
              <NavMenuSubLinks
                currentMenu={currentMenu}
                closeMenu={closeMenu}
              />
            </div>
          </div>
          <NavMenuText description={currentMenu.description} />
        </div>
      </div>
    </div>
  );
}
