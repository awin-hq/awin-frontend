import Image from "next/image";
import styles from "./feature-card.module.css";

type FeatureCardProps = {
  icon: string;
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
      <Image
        src={icon}
        alt=""
        width={42}
        height={42}
        className={styles.icon}
      />

      <h3 className={styles.title}>
        {title}
      </h3>

      <p className={styles.description}>
        {description}
      </p>
    </article>
  );
}