import { EmailFormSection } from "@components/email/EmailFormSection";
import { Footer } from "@components/layout/Footer";
import { Pricing } from "@components/plans/PricingSection";
import Link from "next/link";
import { BentoGridSection } from "./_components/BentoSection";
import { CTAImageSection } from "./_components/cta/CTAImageSection";
import { CtaSection } from "./_components/cta/CTASection";
import { FAQSection } from "./_components/FAQSection";
import { Hero } from "./_components/Hero";
import { LandingHeader } from "./_components/LandingHeader";
import { MapSection } from "./_components/mapSection";
import { MarqueeReview } from "./_components/review/MarqueeReview";
import { ReviewTriple } from "./_components/review/ReviewTriple";
import { SectionDivider } from "./_components/SectionDivider";
import { StatsSection } from "./_components/StatsSection";
import { StepSection } from "./_components/StepSection";

export default function HomePage() {
  return (
    <div className="relative flex h-fit flex-col bg-background text-foreground">
      <div className="mt-16"></div>
      <Link href={"toto"} />
      <LandingHeader />

      <Hero />

      <StepSection />

      <MapSection />

      <StatsSection />

      <CtaSection />

      <BentoGridSection />

      <SectionDivider />

      <ReviewTriple
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=a8",
            name: "Alexandra Johnson",
            review: `From-A2B **has truly simplified my travel planning** with its user-friendly interface and efficient trip management tools. I highly recommend their service to anyone looking for a convenient way to organize their trips effortlessly.`,
            role: "Digital Marketer",
          },
          {
            image: "https://i.pravatar.cc/300?u=a1",
            name: "Alex Miller",
            review: `I am beyond impressed with From-a2b's seamless platform. Their service makes travel a breeze. **From A2B is the perfect solution for anyone looking to simplify their trip planning.** Highly recommend!`,
            role: "Social Media Influencer",
          },
          {
            image: "https://i.pravatar.cc/300?u=a11",
            name: "Emily Parker",
            review: `From-a2b's service made traveling stress-free and efficient. I highly recommend their simple and easy solution for managing trips. **With From A2B, planning and organizing travels becomes a breeze.**`,
            role: "Entrepreneur",
          },
        ]}
      />

      <SectionDivider />

      <CTAImageSection />

      <Pricing />

      <FAQSection
        faq={[
          {
            question: "What is From-A2B?",
            answer:
              "From-A2B is an innovative platform designed to help you imagine, create and plan your dream trips.",
          },
          {
            question: "TODO Find more question?",
            answer: "I don't have the answer",
          },
        ]}
      />

      <MarqueeReview />

      <EmailFormSection />

      <SectionDivider />

      <Footer />
    </div>
  );
}
