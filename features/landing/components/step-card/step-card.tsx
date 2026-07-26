import Image from "next/image";

import styles from "./step-card.module.css";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
  image: string;
};

export function StepCard({
  number,
  title,
  description,
  image,
}: StepCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
        />
      </div>

      <span className={styles.number}>
        {number}
      </span>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}