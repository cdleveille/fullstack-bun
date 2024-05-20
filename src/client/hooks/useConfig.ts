export const useConfig = () => {
	const Config = { IS_PROD: Bun.env.IS_PROD === "true" };

	return { Config };
};
