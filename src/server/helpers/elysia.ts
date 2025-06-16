import { type ErrorHandler, ValidationError } from "elysia";

import { ErrorMessage } from "@/shared/constants";

export const onError: ErrorHandler = ({ error }) => {
	if (error instanceof ValidationError) {
		const message = error.all.map(e => e.summary).join(", ");
		return { message };
	}
	const message = getErrorMessage(error);
	return { message };
};

const getErrorMessage = (error: unknown) => {
	if (
		!!error &&
		typeof error === "object" &&
		"message" in error &&
		typeof (error as Record<string, unknown>).message === "string"
	) {
		return error.message;
	}
	if (typeof error === "string") return error;
	return ErrorMessage.InternalServerError;
};
