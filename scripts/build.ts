import fs from "fs";

import { Config } from "@helpers";

export const build = async () => {
	const SRC_DIR = "src/client";
	const OUT_DIR = "public";

	if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);
	else fs.readdirSync(OUT_DIR).forEach(f => fs.rmSync(`${OUT_DIR}/${f}`, { recursive: true }));

	const copyFiles = async (filenames: string[]) => {
		const ops = filenames.reduce((acc, filename) => {
			acc.push(Bun.write(`${OUT_DIR}/${filename}`, Bun.file(`${SRC_DIR}/${filename}`)));
			return acc;
		}, [] as Promise<any>[]);
		await Promise.all(ops);
	};

	const filesToCopy = ["index.html", "style.css", "favicon.ico"];

	await Promise.all([
		copyFiles(filesToCopy),
		Bun.build({
			entrypoints: [`${SRC_DIR}/index.tsx`],
			naming: "main.js",
			outdir: OUT_DIR,
			minify: Config.IS_PROD,
			root: SRC_DIR,
			sourcemap: Config.IS_PROD ? "none" : "inline",
			target: "browser"
		})
	]);
};

await build();
