import { z } from "zod";

export const signInEvent = z.enum([
  "SigninWithMagicLink",
  "SigninWithGithub",
  "SigninWithGoogle",
]);

export const phEvents = z.enum(["JoinWaitingList"]);
export const contactEvents = z.enum([
  "ClickFeedBack",
  "SendFeedBack",
  "ClickContactSupport",
  "SendContactSupport",
]);

export const tripEvents = z.enum([
  "TripCreate",
  "TripDelete",
  "TripUpdate",
  "AddStep",
  "AddStepBefore",
  "AddStepAfter",
  "RemoveStep",
  "EditStep",
  "ReOrderStep",
  "UsePlaceInput",
]);

export const mapEvents = z.enum(["UseCenterMap"]);

export const dateEvents = z.enum(["DateUseCalendar", "DateUseAiPrompt"]);

export const blobEvents = z.enum([
  "UploadPicture",
  "DeletePicture",
  "UploadFile",
  "DeleteFile",
]);

export const errorEvents = z.enum([
  "ServerActionFailed",
  "ServerActionError",
  "ServerActionSchemaValidationFailed",
]);

export const combinedPhEvents = z.union([
  phEvents,
  signInEvent,
  contactEvents,
  tripEvents,
  dateEvents,
  mapEvents,
  blobEvents,
  errorEvents,
]);

export type phEvents = z.infer<typeof combinedPhEvents>;
