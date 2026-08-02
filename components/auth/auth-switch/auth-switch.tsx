import Link from "next/link";
import styles from "./auth-switch.module.css";

type AuthSwitchProps = {
  text: string;
  action: string;
  href: string;
};

export function AuthSwitch({
  text,
  action,
  href,
}: AuthSwitchProps) {
  return (
    <div className={styles.container}>
      <span className={styles.text}>
        {text}
      </span>

      <Link
        href={href}
        className={styles.link}
      >
        {action}
      </Link>
    </div>
  );
}