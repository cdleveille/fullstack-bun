import { z, type ZodError, type ZodIssue } from "zod";

import { CustomError } from "@helpers";

export const validatePayloadSchema = ({
	payload,
	schema,
	message = "Invalid payload schema"
}: {
	payload: unknown;
	schema: z.ZodTypeAny;
	message?: string;
}) => {
	const result = schema.safeParse(payload);
	if (!result.success) throwValidationError(message, result.error);
};

const throwValidationError = (message: string, error: ZodError) => {
	const errorMessages = error.errors
		.map(err => {
			const error = err as ZodIssue & { expected?: string };
			const path = error.path.join(".");
			const message = error.message;
			const expected = error.expected ? ` <${error.expected}>` : "";
			return `${path}${expected}: ${message}`;
		})
		.join(", ");
	throw new CustomError(`${message}: ${errorMessages}`, 400);
};
