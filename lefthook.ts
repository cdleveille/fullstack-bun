import { chmod, exists, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

if (!(await exists(".git"))) {
	throw new Error("lefthook.ts script must be run from the root folder of git repo");
}

const HOOKS_DIR = ".git/hooks";

await mkdir(HOOKS_DIR, { recursive: true });

const preCommit = `#!/bin/sh
export PATH="$PWD/node_modules/.bin:$PATH"
lefthook run pre-commit --no-auto-install`;

await writeFile(join(HOOKS_DIR, "pre-commit"), preCommit);

await chmod(join(HOOKS_DIR, "pre-commit"), 0o755);

console.log("lefthook hooks synced ✅");
