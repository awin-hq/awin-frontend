import styles from "./placeholder-view.module.css";

type PlaceholderViewProps = {
  title: string;
  description?: string;
};

/**
 * Lightweight stub for dashboard sections that are not part of the current
 * MVP screens but are reachable from the navigation.
 */
export function PlaceholderView({
  title,
  description = "This section is coming soon.",
}: PlaceholderViewProps) {
  return (
    <div className={styles.view}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
