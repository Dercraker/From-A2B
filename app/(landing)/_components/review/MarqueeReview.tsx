import { SectionLayout } from "@components/layout/SectionLayout";
import { Marquee } from "@components/ui/marquee";
import { ReviewItem, type ReviewItemProps } from "./ReviewItem";

const reviews: ReviewItemProps[] = [
  {
    review:
      "From-A2B has completely transformed how I plan my trips! The intuitive interface and smart recommendations make every journey stress-free. **This is a must-have for anyone who loves to travel efficiently.**",
    name: "Michael Carter",
    role: "A Tale of Two Cities",
    image: "https://i.pravatar.cc/300?img=3",
  },
  {
    review:
      "I never thought planning a trip could be this easy! From-A2B takes care of everything, from itinerary management to travel suggestions. **It’s like having a personal travel assistant in your pocket.**",
    name: "Jessica Thompson",
    role: "Hamlet",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    review:
      "From-A2B saved me hours of planning! The ability to customize my trip and get real-time updates is a game-changer. **If you love traveling but hate the hassle of organizing, this app is for you!.**",
    name: "David Reynolds",
    role: "A Dream Within a Dream",
    image: "https://i.pravatar.cc/300?img=4",
  },
  {
    review:
      "I’ve tried many travel apps, but From-A2B is by far the best! The seamless experience and smart features make it the perfect travel companion. **I can’t imagine planning another trip without it!**",
    name: "Rachel Adams",
    role: "Pride and Prejudice",
    image: "https://i.pravatar.cc/300?img=2",
  },
  {
    review:
      "From-A2B takes the stress out of travel planning. With its easy-to-use features and smart trip organization, **it’s the only tool I need to create the perfect itinerary.**",
    name: "Daniel Brooks",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=6",
  },
  {
    review:
      "Traveling has never been this simple! From-A2B handles everything, from accommodations to activities, all in one place. **Highly recommended for frequent travelers!**",
    name: "Samantha Miller",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    review:
      "From-A2B’s smart trip planner helps me stay organized while exploring new places. **I love how it automatically optimizes my routes and schedule!**",
    name: "James Richardson",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=8",
  },
  {
    review:
      "As a solo traveler, I rely on From-A2B to keep everything in one place. **No more juggling between multiple apps—this is the ultimate travel organizer!**",
    name: "Olivia Collins",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=9",
  },
  {
    review:
      "Planning a trip used to be stressful, but not anymore! From-A2B streamlines everything, so I can focus on enjoying my travels. **A must-have for adventure lovers!**",
    name: "Ethan Walker",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=7",
  },
  {
    review:
      "From-A2B makes trip planning seamless and fun! **I no longer worry about missing reservations or getting lost—it’s all in the app.**",
    name: "Emma Harrison",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=10",
  },
  {
    review:
      "I used to spend hours researching and organizing my itinerary. With From-A2B, I do it in minutes! **The best investment for stress-free travel.**",
    name: "William Cooper",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    review:
      "From-A2B helped me plan the perfect family vacation! **Everything was organized flawlessly, making our trip smooth and enjoyable.**",
    name: "Sophia Bennett",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=19",
  },
  {
    review:
      "From-A2B is an absolute game-changer! **The AI-powered suggestions helped me discover amazing hidden gems in every destination.**",
    name: "Jacob Foster",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=13",
  },
  {
    review:
      "I love how From-A2B keeps all my travel details in one place. **It’s like having a personal concierge at my fingertips!**",
    name: "Madison Clark",
    role: "Moby-Dick",
    image: "https://i.pravatar.cc/300?img=16",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export const MarqueeReview = () => {
  return (
    <SectionLayout variant="default" className="antialiased" size="full">
      <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Marquee pauseOnHover className="[--duration:60s]">
          {firstRow.map((review) => (
            <ReviewItem
              key={review.role}
              {...review}
              className="w-96 min-w-96"
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:60s]">
          {secondRow.map((review) => (
            <ReviewItem
              key={review.role}
              {...review}
              className="w-96 min-w-96"
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </SectionLayout>
  );
};
