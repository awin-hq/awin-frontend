import styles from "./progress-indicator.module.css";

type Props = {
  current: number;
  total: number;
};

export function ProgressIndicator({
  current,
  total,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <span>
        Step {current} of {total}
      </span>

      <div className={styles.track}>
        <div
          className={styles.progress}
          style={{
            width: `${(current / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}