// Static export for GitHub Pages. Route handlers (app/api) cannot be exported, so they are moved aside for the build and restored after.
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const api = "app/api";
const tmp = ".api-excluded";
const moved = fs.existsSync(api);
if (moved) fs.renameSync(api, tmp);
fs.rmSync(".next", { recursive: true, force: true }); // stale dev route types would reference the excluded API route
let code = 1;
try {
  code = spawnSync("npx", ["next", "build"], { stdio: "inherit", shell: true, env: { ...process.env, STATIC_EXPORT: "1" } }).status ?? 1;
} finally {
  if (moved) fs.renameSync(tmp, api);
}
process.exit(code);
