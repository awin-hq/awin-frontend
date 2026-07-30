import styles from "./landing.module.css";

import { Navbar } from "./components/navbar/navbar";

import { HeroSection } from "./sections/hero-section/hero-section";
import { ProblemSection } from "./sections/problem-section/problem-section";
import { FeaturesSection } from "./sections/features-section/features-section";
import { ShowcaseSection } from "./sections/showcase-section/showcase-section";
import { StepsSection } from "./sections/steps-section/steps-section";
import { BusinessSection } from "./sections/business-section/business-section";
import { FAQSection } from "./sections/faq-section/faq-section";
import { CTASection } from "./sections/cta-section/cta-section";
import { Footer } from "./components/footer/footer";

export function LandingPage() {
  return (
    <main className={styles.page}>
      <Navbar />

      <HeroSection />

      <ProblemSection />

      <FeaturesSection />

      <ShowcaseSection />

      <StepsSection />

      <BusinessSection />

      <FAQSection />

      <CTASection />

      <Footer />
    </main>
  );
}