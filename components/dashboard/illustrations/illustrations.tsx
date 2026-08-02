import styles from "./illustrations.module.css";

/** Thin ring with a small brand dot — used for the "no due payments" state. */
export function DuePaymentsEmptyArt() {
  return (
    <svg
      className={styles.ring}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="var(--color-border)"
        strokeWidth="3"
      />
      <circle cx="104" cy="78" r="7" fill="var(--color-primary)" />
    </svg>
  );
}

/** Stylised trader-with-phone figure for the reminder banner. */
export function ReminderArt() {
  return (
    <svg
      width="96"
      height="104"
      viewBox="0 0 96 104"
      fill="none"
      aria-hidden="true"
    >
      {/* body */}
      <path
        d="M20 104c0-20 12-34 28-34s28 14 28 34H20Z"
        fill="#6D28D9"
      />
      {/* head wrap */}
      <path
        d="M30 30c0-11 8-20 18-20s18 9 18 20c0 4-2 7-5 9-3-8-8-12-13-12s-10 4-13 12c-3-2-5-5-5-9Z"
        fill="#F5B940"
      />
      {/* face */}
      <circle cx="48" cy="40" r="13" fill="#8B5E34" />
      {/* phone */}
      <rect
        x="58"
        y="52"
        width="16"
        height="24"
        rx="3"
        fill="#1E1E1E"
        transform="rotate(18 66 64)"
      />
      {/* arm */}
      <path
        d="M48 62c6 0 12 2 16 6"
        stroke="#8B5E34"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Clipboard + chart + calendar illustration for the weekly summary state. */
export function WeeklySummaryEmptyArt() {
  return (
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      fill="none"
      aria-hidden="true"
    >
      {/* dotted arc */}
      <path
        d="M40 40 Q100 8 160 40"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeDasharray="3 6"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* calendar tile */}
      <rect
        x="30"
        y="66"
        width="46"
        height="46"
        rx="8"
        fill="#FDEBD8"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />
      <line
        x1="30"
        y1="80"
        x2="76"
        y2="80"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />
      <rect x="40" y="88" width="8" height="8" rx="2" fill="var(--color-primary)" />
      <rect x="58" y="88" width="8" height="8" rx="2" fill="#F5B940" />

      {/* clipboard */}
      <rect
        x="78"
        y="34"
        width="76"
        height="92"
        rx="10"
        fill="#FFFFFF"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />
      <rect
        x="104"
        y="28"
        width="24"
        height="14"
        rx="5"
        fill="var(--color-primary)"
      />
      {/* bars */}
      <rect x="94" y="86" width="12" height="26" rx="3" fill="#F5B940" />
      <rect x="112" y="72" width="12" height="40" rx="3" fill="var(--color-primary)" />
      <rect x="130" y="94" width="12" height="18" rx="3" fill="#FDEBD8" />

      {/* brand badge */}
      <circle cx="158" cy="104" r="16" fill="#1E1E1E" />
      <text
        x="158"
        y="110"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="#FFFFFF"
      >
        N
      </text>
    </svg>
  );
}
