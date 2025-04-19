import Social from "./Social";
import { socials } from "@/lib/placeholder-data";
import styles from "./socials.module.css";

const Socials = () => {
  return (
    <div className={styles.socials}>
      {socials.map((social) => {
        return <Social social={social} key={social.id} />;
      })}
    </div>
  );
};

export default Socials;
