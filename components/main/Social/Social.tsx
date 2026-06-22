import { ISocial } from "@/lib/definitions";
import Image from "next/image";
import styles from "./socials.module.css";
import clsx from "clsx";
import { image } from "@/components/imageHelper";

const Social = ({ social }: { social: ISocial }) => {
  return (
    <a
      href={social.link}
      target="_blank"
      className={clsx(styles["social-link"])}
    >
      <Image src={social.icon} alt={social.name} width={25} height={25} />
    </a>
  );
};

export default Social;
