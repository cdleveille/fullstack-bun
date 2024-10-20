import chokidar from "chokidar";
import path from "path";

import { buildClient } from "@services";

const SRC_DIR = path.resolve("./src");

const watcher = chokidar.watch(SRC_DIR, { persistent: true });

const stopWatching = async () => {
	watcher.unwatch(SRC_DIR);
	await watcher.close();
};

process.on("exit", () => stopWatching);
process.on("SIGINT", () => stopWatching);

export const initWatch = async (emitReload: () => void) => {
	const buildAndReloadClient = async () => {
		await buildClient();
		emitReload();
	};
	watcher.on("change", buildAndReloadClient);
};
