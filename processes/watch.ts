import chokidar from "chokidar";
import path from "path";

import { buildClient } from "@processes";

const WATCH_DIR = path.resolve("./src/client");

const watcher = chokidar.watch(WATCH_DIR, { persistent: true });

const stopWatching = async () => {
	watcher.unwatch(WATCH_DIR);
	await watcher.close();
};

process.on("exit", () => stopWatching);
process.on("SIGINT", () => stopWatching);

export const initWatch = (emitReload: () => void) => {
	watcher.on("change", async () => {
		await buildClient();
		emitReload();
	});
};
