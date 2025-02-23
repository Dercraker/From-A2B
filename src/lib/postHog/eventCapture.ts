import posthog from "posthog-js";
import type { phEvents } from "./phEvents";

export const phCapture = (eventName: phEvents, data?: object) =>
  posthog.capture(eventName, { ...data });

export const phErrorCapture = (eventName: phEvents, data?: object) =>
  posthog.captureException(eventName, { ...data });
