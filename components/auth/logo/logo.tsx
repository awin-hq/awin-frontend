import Image from "next/image";
import styles from "./logo.module.css";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={`${styles.logo} ${className ?? ""}`}>
      <Image
        src="/assets/logo/logo.png"
        alt="AWÍN logo"
        width={48}
        height={24}
        priority
      />
    </div>
  );
}