export type Plan = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  barredPrice?: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
  type?: "monthly" | "yearly" | "one-time";
  className?: string;
  priceId: string;
  cta: string;
  ctaSubtitle: string;
};

export const PLANS = [
  {
    id: "FREE",
    name: "Free",
    subtitle: "Perfect for tiny travelers",
    price: 0,
    currency: "EUR",
    features: [
      "10 trips",
      "50 steps per trip",
      "No advertising",
      "10 pictures per trips",
    ],
    isPopular: false,
    priceId: "",
    cta: "Start for free",
    ctaSubtitle: "No credit card required",
  },
  {
    id: "FREE",
    name: "Free",
    subtitle: "Perfect for tiny travelers",
    price: 0,
    currency: "EUR",
    features: [
      "10 trips",
      "50 steps per trip",
      "No advertising",
      "10 pictures per trips",
    ],
    isPopular: true,
    priceId: "",
    cta: "Start for free",
    ctaSubtitle: "No credit card required",
  },
  {
    id: "FREE",
    name: "Free",
    subtitle: "Perfect for tiny travelers",
    price: 0,
    currency: "EUR",
    features: [
      "10 trips",
      "50 steps per trip",
      "No advertising",
      "10 pictures per trips",
    ],
    isPopular: false,
    priceId: "",
    cta: "Start for free",
    ctaSubtitle: "No credit card required",
  },
  // {
  //   id: "PREMIUM",
  //   name: "Premium",
  //   subtitle: "Perfect for travelers",
  //   price: 49,
  //   barredPrice: 73,
  //   currency: "EUR",
  //   features: [
  //     "50 trips",
  //     "100 steps per trip",
  //     "100 pictures per trip",
  //     "Export your trips",
  //     "Link 1 file by step",
  //     "And more...",
  //   ],
  //   isPopular: true,
  //   type: "yearly",
  //   priceId: "price_1PmuveGPhxExaYaQXj6bys02",
  //   cta: "Start now",
  //   ctaSubtitle: "Then $49/years",
  // },
  // {
  //   id: "PREMIUM",
  //   name: "Premium +",
  //   subtitle: "Perfect for content creator",
  //   price: 89,
  //   barredPrice: 99,
  //   currency: "EUR",
  //   features: [
  //     "All Premium features",
  //     "Unlimited trips",
  //     "Unlimited Pictures",
  //     "Unlimited Files",
  //     "Itinerary Export",
  //     "Make trip with collaborators",
  //     "And more...",
  //   ],
  //   isPopular: false,
  //   type: "monthly",
  //   priceId: "price_1PmuveGPhxExaYaQXj6bys02",
  //   cta: "Start now",
  //   ctaSubtitle: "Then $49/month",
  // },
] satisfies Plan[];
