import type { ReactNode } from "react";

import styles from "./empty-state.module.css";

type EmptyStateProps = {
  /** "inline" renders a bordered card with the icon beside the text.
   *  "center" renders a centered illustration above the text. */
  layout?: "inline" | "center";
  icon?: ReactNode;
  illustration?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({
  layout = "inline",
  icon,
  illustration,
  title,
  description,
  action,
}: EmptyStateProps) {
  if (layout === "center") {
    return (
      <div className={styles.center}>
        {illustration ? (
          <div className={styles.illustration}>{illustration}</div>
        ) : null}

        <h3 className={styles.centerTitle}>{title}</h3>

        {description ? (
          <p className={styles.centerText}>{description}</p>
        ) : null}

        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    );
  }

  return (
    <div className={styles.inline}>
      {icon ? <span className={styles.inlineIcon}>{icon}</span> : null}

      <div>
        <p className={styles.inlineTitle}>{title}</p>
        {description ? (
          <p className={styles.inlineText}>{description}</p>
        ) : null}
      </div>
    </div>
  );
}
