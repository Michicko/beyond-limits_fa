import { socials } from "@/lib/helpers";
import Social from "./Social";
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
