import Image from "next/image";

import styles from "./phone-mockup.module.css";

export function PhoneMockup() {
  return (
    <div className={styles.phone}>
      <Image
        src="/assets/landing/Phone mockups.png"
        alt="AWÍN Dashboard"
        fill
        priority
        className={styles.image}
      />
    </div>
  );
}