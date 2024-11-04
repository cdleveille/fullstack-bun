export const Config = {
	IS_PROD: Bun.env.IS_PROD === "true",
	WS_PORT: parseInt(Bun.env.WS_PORT ?? "443")
};
