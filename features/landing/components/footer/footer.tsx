import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>AWÍN</h2>

            <p className={styles.description}>
              Helping Nigerian businesses manage customer
              credit with confidence.
            </p>

            <div className={styles.socials}>
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="https://x.com"
                target="_blank"
                aria-label="X"
              >
                <FaXTwitter size={18} />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>

          <div className={styles.links}>
            <div>
              <h4>Product</h4>

              <Link href="#features">Features</Link>

              <Link href="#how-it-works">
                How It Works
              </Link>

              <Link href="#faq">
                FAQs
              </Link>
            </div>

            <div>
              <h4>Company</h4>

              <Link href="#">
                About
              </Link>

              <Link href="#">
                Contact
              </Link>

              <Link href="#">
                Privacy Policy
              </Link>

              <Link href="#">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} AWÍN. All rights
            reserved.
          </span>

          <div className={styles.bottomLinks}>
            <Link href="#">
              Terms
            </Link>

            <Link href="#">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}