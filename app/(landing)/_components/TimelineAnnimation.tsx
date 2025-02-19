"use client";

import { Card } from "@components/ui/card";
import { motion } from "framer-motion";
import React from "react";

export const TimelineAnimation = () => {
  const steps = [
    {
      id: 1,
      title: "Create a trip",
      description:
        "Create your trip easily by filling in the various form fields to make your experience complete. Once your trip is created, you can then add steps.",
    },
    {
      id: 2,
      title: "Add steps",
      description:
        "Add new steps or activities to your trip in a few clicks. Whether it's sightseeing, dining, or adventure, you can create a detailed itinerary for your trip.",
    },
    {
      id: 3,
      title: "AI Recommendations",
      description:
        "Our AI technology analyzes your preferences and suggests the best steps and activities for you. Discover hidden gems, popular attractions, and more.",
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="flex w-full items-center justify-between lg:flex">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              // @ts-expect-error - TODO : Remove this when framer-motion fully supports react 19 (https://mlv.sh/fm-r19)
              className={`animate-step-${step.id} max-lg:hidden`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                {step.id}
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`animate-step-${step.id} mt-4 w-full lg:mt-0 lg:w-1/3`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: false }} // Réinitialiser l'animation à chaque fois que l'élément entre dans la vue
            >
              <Card className="rounded-md border border-card-foreground/10 p-4 shadow-sm">
                <div className="mb-4 flex items-center lg:hidden">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{step.description}</p>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
