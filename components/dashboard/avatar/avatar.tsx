import { avatarColor, initials } from "@/lib/format";

import styles from "./avatar.module.css";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
};

export function Avatar({ name, size = "md" }: AvatarProps) {
  return (
    <span
      className={`${styles.avatar} ${styles[size]}`}
      style={{ background: avatarColor(name) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
