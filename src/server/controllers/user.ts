import { Hono } from "hono";

import { errorResponse, successResponse } from "@helpers";
import { User } from "@models";

export const initUserRoutes = (app: Hono) => {
	app.get("/user", async c => {
		const users = await User.find({}, { password: 0 });
		return successResponse(c, users);
	});

	app.get("/user/:id", async c => {
		try {
			const id = c.req.param("id");
			const user = await User.findOne({ id }, { password: 0 });
			if (!user) throw { code: 404, data: "User not found." };
			return successResponse(c, user);
		} catch (error) {
			return errorResponse(c, error);
		}
	});
};
