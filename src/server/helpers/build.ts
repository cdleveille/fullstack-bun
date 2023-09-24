import { BuildConfig } from "bun";
import fs from "fs";
import { rimraf } from "rimraf";

import { Config } from "@helpers";

export const buildClient = async () => {
	const SRC_DIR = "src/client";
	const OUT_DIR = "public";

	const copyFiles = async (filenames: string[]) => {
		const ops = filenames.reduce((acc, filename) => {
			acc.push(Bun.write(`${OUT_DIR}/${filename}`, Bun.file(`${SRC_DIR}/${filename}`)));
			return acc;
		}, [] as Promise<number>[]);
		await Promise.all(ops);
	};

	await rimraf(OUT_DIR);
	fs.mkdirSync(OUT_DIR);

	const buildCommon = {
		root: SRC_DIR,
		outdir: OUT_DIR,
		minify: Config.IS_PROD,
		target: "browser",
		sourcemap: Config.IS_PROD ? "none" : "inline"
	} as Partial<BuildConfig>;

	const buildMain = Bun.build({
		...buildCommon,
		entrypoints: [`${SRC_DIR}/main.tsx`],
		naming: {
			entry: "[dir]/[name]~[hash].[ext]",
			asset: `${SRC_DIR}/assets/[name].[ext]`
		}
	});

	const buildSw = Bun.build({
		...buildCommon,
		entrypoints: [`${SRC_DIR}/sw.ts`]
	});

	const filesToCopy = ["index.html"];

	const [build] = await Promise.all([buildMain, buildSw, copyFiles(filesToCopy)]);

	const jsHash = build.outputs.find(output => output.path.endsWith(".js"))?.hash;
	const indexHtmlContents = await Bun.file(`${OUT_DIR}/index.html`).text();
	const indexHtmlContentsWithHashes = indexHtmlContents.replace("{js-hash}", jsHash);
	await Bun.write(`${OUT_DIR}/index.html`, indexHtmlContentsWithHashes);
};
