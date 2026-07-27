import Image from "next/image";

import styles from "./step-card.module.css";

type StepCardProps = {
  number: string;
  title: string;
  image: string;
  rotation?: string;
};

export function StepCard({
  number,
  title,
  image,
  rotation = "0deg",
}: StepCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.number}>
        {number}
      </span>

      <div
        className={styles.imageWrapper}
        style={
          {
            "--rotation": rotation,
          } as React.CSSProperties
        }
      >
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
        />
      </div>

      <p className={styles.title}>
        {title}
      </p>
    </article>
  );
}