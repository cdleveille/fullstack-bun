import { Config } from "@helpers";

export const buildClient = async () => {
	const SRC_DIR = "src/client";
	const OUT_DIR = "public";
	await Bun.build({
		entrypoints: [`${SRC_DIR}/index.tsx`, `${SRC_DIR}/sw.ts`],
		outdir: OUT_DIR,
		minify: Config.IS_PROD,
		root: SRC_DIR,
		sourcemap: Config.IS_PROD ? "none" : "inline",
		target: "browser"
	});
};

await buildClient();
