import styles from "./feature-card.module.css";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.icon}>
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}