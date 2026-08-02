import styles from "./showcase-card.module.css";

type Props = {
  title: string;
  value: string;
};

export function ShowcaseCard({
  title,
  value,
}: Props) {
  return (
    <div className={styles.card}>
      <span>{title}</span>

      <strong>{value}</strong>
    </div>
  );
}