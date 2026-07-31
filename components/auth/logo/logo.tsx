// import Image from "next/image";
// import styles from "./logo.module.css";

// type LogoProps = {
//   className?: string;
// };

// export function Logo({ className }: LogoProps) {
//   return (
//     <div className={`${styles.logo} ${className ?? ""}`}>
//       <Image
//         src="/assets/logo/logo-new.svg"
//         alt="AWÍN logo"
//         width={48}
//         height={24}
//         priority
//       />
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";

import styles from "./logo.module.css";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${className ?? ""}`}
      aria-label="Go to AWÍN homepage"
    >
      <Image
        src="/assets/logo/logo-new.svg"
        alt="AWÍN logo"
        width={140}
        height={40}
        priority
      />
    </Link>
  );
}