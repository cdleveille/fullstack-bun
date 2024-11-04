import chokidar from "chokidar";
import path from "path";

import { Path } from "@constants";
import { buildClient } from "@processes";

const WATCH_DIR = path.resolve(Path.ClientSrc);

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
