import styles from "./business-card.module.css";

type BusinessCardProps = {
  title: string;
  description: string;
};

export function BusinessCard({
  title,
  description,
}: BusinessCardProps) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}