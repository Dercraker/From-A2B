import type { User } from "@prisma/client";
import { baseAuth } from "./auth";

export class AuthError extends Error {}

export const currentUser = async () => {
  const session = await baseAuth();

  if (session?.user) {
    const user = session.user as User;
    return user;
  }

  return null;
};

export const requiredUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new AuthError("You must be authenticated to access this resource");
  }

  return user as User;
};
