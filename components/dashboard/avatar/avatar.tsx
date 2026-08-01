import { avatarColor, initials } from "@/lib/format";

import styles from "./avatar.module.css";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
<<<<<<< HEAD
  /** Override the auto-generated colour (e.g. brand orange on profiles). */
  color?: string;
};

export function Avatar({ name, size = "md", color }: AvatarProps) {
  return (
    <span
      className={`${styles.avatar} ${styles[size]}`}
      style={{ background: color ?? avatarColor(name) }}
=======
};

export function Avatar({ name, size = "md" }: AvatarProps) {
  return (
    <span
      className={`${styles.avatar} ${styles[size]}`}
      style={{ background: avatarColor(name) }}
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
