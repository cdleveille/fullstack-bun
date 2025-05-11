import { injectManifest } from "workbox-build";

import { HASH_REGEX, Path } from "@constants";
import { log } from "@helpers";

const outDir = Path.Public;

log.info("Injecting build manifest into sw.js...");

const { count } = await injectManifest({
	globDirectory: outDir,
	globPatterns: ["**/*.*"],
	swSrc: `${outDir}/sw.js`,
	swDest: `${outDir}/sw.js`,
	maximumFileSizeToCacheInBytes: 5000000,
	dontCacheBustURLsMatching: HASH_REGEX
});

log.info(`${count} URLs were injected ✅`);
