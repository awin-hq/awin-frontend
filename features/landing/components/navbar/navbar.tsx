"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/auth/logo/logo";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import styles from "./navbar.module.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div
            className={styles.logo}
            onClick={closeMenu}
          >
            <Logo />
          </div>

          <nav className={styles.nav}>
            <a href="#features">Features</a>

            <a href="#how-it-works">
              How It Works
            </a>

            <a href="#faq">
              FAQs
            </a>
          </nav>

          <Link
            href="/register"
            className={styles.demoButton}
          >
            Get Started
          </Link>

          <button
            type="button"
            aria-label="Toggle Menu"
            className={styles.menuButton}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </header>

      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          <a
            href="#features"
            onClick={closeMenu}
          >
            Features
          </a>

          <a
            href="#how-it-works"
            onClick={closeMenu}
          >
            How It Works
          </a>

          <a
            href="#faq"
            onClick={closeMenu}
          >
            FAQs
          </a>

          <Link
            href="/register"
            className={styles.mobileButton}
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </>
  );
}