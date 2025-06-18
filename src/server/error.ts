import { type ErrorHandler, ValidationError } from "elysia";

import { ErrorMessage } from "@/shared/constants";

export const onError: ErrorHandler = ({ error }) => {
  if (error instanceof ValidationError) {
    const message = error.all.map(e => e.summary).join(", ");
    return { message };
  }
  if (typeof error === "string") return { message: error };
  if ("message" in error) return { message: error.message };
  if ("error" in error) return { message: error.error };
  return { message: ErrorMessage.InternalServerError };
};
