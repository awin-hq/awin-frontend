import styles from "./auth-header.module.css";

type Props = {
  title: string;
  description: string;
};

export function AuthHeader({
  title,
  description,
}: Props) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>

      <p>{description}</p>
    </header>
  );
}