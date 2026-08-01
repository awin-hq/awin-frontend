import { avatarColor, initials } from "@/lib/format";

import styles from "./avatar.module.css";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  /** Override the auto-generated colour (e.g. brand orange on profiles). */
  color?: string;
};

export function Avatar({ name, size = "md", color }: AvatarProps) {
  return (
    <span
      className={`${styles.avatar} ${styles[size]}`}
      style={{ background: color ?? avatarColor(name) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
