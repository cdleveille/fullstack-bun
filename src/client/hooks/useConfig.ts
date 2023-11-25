export const useConfig = () => {
	const Config = { IS_PROD: !window.location.host.includes("localhost:") };

	return { Config };
};
