import { EmailFormSection } from "@/components/email/EmailFormSection";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/plans/PricingSection";
import { BentoGridSection } from "./_components/BentoSection";
import { CTAImageSection } from "./_components/cta/CTAImageSection";
import { CtaSection } from "./_components/cta/CTASection";
import { FAQSection } from "./_components/FAQSection";
import { Hero } from "./_components/Hero";
import { LandingHeader } from "./_components/LandingHeader";
import { MapSection } from "./_components/mapSection";
import { ReviewTriple } from "./_components/review/ReviewTriple";
import { SectionDivider } from "./_components/SectionDivider";
import { StatsSection } from "./_components/StatsSection";
import { StepSection } from "./_components/StepSection";

export default function HomePage() {
  return (
    <div className="relative flex h-fit flex-col bg-background text-foreground">
      <div className="mt-16"></div>

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
            image: "https://i.pravatar.cc/300?u=a1",
            name: "Sophie",
            review: `Threader **has completely transformed the way I manage my social media** content. The ability to schedule posts and use AI for content suggestions has saved me hours each week.`,
            role: "Digital Marketer",
          },
          {
            image: "https://i.pravatar.cc/300?u=a2",
            name: "Alex",
            review: `Using Threader has significantly boosted my online engagement. **The analytics tool helps me understand what works**, allowing me to refine my strategy and grow my follower base.`,
            role: "Social Media Influencer",
          },
          {
            image: "https://i.pravatar.cc/300?u=a3",
            name: "Jordan",
            review: `The ease of scheduling and the AI-generated content features are game-changers. **Threader's user-friendly interface** makes it perfect for anyone looking to enhance their online presence.`,
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

      {/* //TODO: CHECK this  */}
      {/* <ReviewInfiniteCard /> */}

      <EmailFormSection />

      <SectionDivider />

      <Footer />
    </div>
  );
}
