import { BuildArtifact, BuildConfig } from "bun";
import fs from "fs";
import { rimraf } from "rimraf";

import { Config } from "@helpers";
import { log } from "@services";

export const buildClient = async () => {
	try {
		const ROOT_DIR = "src/client";
		const SRC_DIR = "src/client";
		const OUT_DIR = "public";

		const filesToCopy = ["index.html"];

		await rimraf(OUT_DIR);
		fs.mkdirSync(OUT_DIR);

		const buildCommon = {
			root: ROOT_DIR,
			outdir: OUT_DIR,
			minify: Config.IS_PROD,
			target: "browser",
			sourcemap: Config.IS_PROD ? "none" : "inline"
		} as Partial<BuildConfig>;

		const buildMain = Bun.build({
			...buildCommon,
			entrypoints: [`${SRC_DIR}/main.tsx`],
			naming: {
				entry: `${ROOT_DIR}/[dir]/[name]~[hash].[ext]`,
				asset: "[dir]/[name].[ext]"
			}
		});

		const buildSw = Bun.build({
			...buildCommon,
			entrypoints: [`${SRC_DIR}/sw.ts`]
		});

		const [{ outputs }] = await Promise.all([buildMain, buildSw, copyFiles(SRC_DIR, OUT_DIR, filesToCopy)]);
		await postBuildOperations(outputs, OUT_DIR);
	} catch (error) {
		log.error(error);
		throw error;
	}
};

const copyFiles = async (srcDir: string, outDir: string, filenames: string[]) => {
	const ops = filenames.reduce((acc, filename) => {
		acc.push(Bun.write(`${outDir}/${filename}`, Bun.file(`${srcDir}/${filename}`)));
		return acc;
	}, [] as Promise<number>[]);
	await Promise.all(ops);
};

const postBuildOperations = async (outputs: BuildArtifact[], outDir: string) => {
	const jsFile = outputs.find(output => output.path.endsWith(".js"));
	const jsFilePathSplit = jsFile.path.split("/");
	const jsFileName = jsFilePathSplit[jsFilePathSplit.length - 1];

	const cssFile = outputs.find(output => output.path.endsWith(".css"));
	const cssFilePathSplit = cssFile.path.split("/");
	const cssFileName = cssFilePathSplit[cssFilePathSplit.length - 1];

	const indexHtmlContents = await Bun.file(`${outDir}/index.html`).text();
	const indexHtmlContentsReplaced = indexHtmlContents.replace("{js}", jsFileName).replace("{css}", cssFileName);

	const writeIndexHtml = Bun.write(`${outDir}/index.html`, indexHtmlContentsReplaced);
	const copyJsFileToRootDir = Bun.write(`${outDir}/${jsFileName}`, Bun.file(jsFile.path));

	await Promise.all([writeIndexHtml, copyJsFileToRootDir]);
	await rimraf(`${outDir}/src`);
};
