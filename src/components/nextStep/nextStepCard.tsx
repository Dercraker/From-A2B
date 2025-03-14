"use client";

import { Button } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Progress } from "@ui/progress";
import { Typography } from "@ui/typography";
import type { Step } from "nextstepjs";

type NextStepCardProps = {
  step: Step;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  arrow: React.ReactNode;
};

export const NextStepCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: NextStepCardProps) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {step.icon && <span>{step.icon}</span>}
          {step.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-2">{step.content}</div>
        {arrow}
      </CardContent>

      <CardFooter className="flex w-full flex-col justify-center gap-2">
        <div className="flex w-full items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="w-20"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Typography
            variant="small"
            className="select-none text-muted-foreground"
          >
            {currentStep + 1} / {totalSteps}
          </Typography>
          <Button
            size="sm"
            className="w-20"
            onClick={nextStep}
            disabled={!step.showControls}
          >
            {currentStep === totalSteps - 1 ? "Finish" : "Next"}
          </Button>
        </div>

        <div className="flex w-full flex-col items-center gap-1">
          <Progress value={((currentStep + 1) / totalSteps) * 100} />
          {step.showSkip && (
            <Typography
              variant="small"
              className="cursor-pointer select-none text-muted-foreground hover:text-primary hover:underline"
              onClick={skipTour}
            >
              Skip
            </Typography>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
