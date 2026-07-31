import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Logo } from "@/components/auth/logo/logo";

import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.divider} />

        <div className={styles.content}>
          {/* Left */}
          <div className={styles.brand}>
            <Logo />

            <p className={styles.description}>
              Your digital credit management platform that helps small
              businesses record credit sales, track customer debts,
              and recover payments faster.
            </p>

            <div className={styles.socials}>
              <Link href="#">
                <FaInstagram />
              </Link>

              <Link href="#">
                <FaLinkedinIn />
              </Link>

              <Link href="#">
                <FaXTwitter />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className={styles.column}>
            <h4>Product</h4>

            <Link href="#features">Features</Link>

            <Link href="#">Pricing</Link>

            <Link href="#faq">FAQs</Link>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h4>Company</h4>

            <Link href="#">About</Link>

            <Link href="#">Privacy Policy</Link>

            <Link href="#">Terms of Service</Link>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4>Contact</h4>

            <a href="mailto:hello@awin.com">
              hello@awin.com
            </a>

            <a href="tel:+2340000000000">
              +234 XXX XXX XXXX
            </a>
          </div>
        </div>

        <div className={styles.divider} />
      </div>
    </footer>
  );
}