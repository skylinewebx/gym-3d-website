// Builds the static site and publishes out/ to the gh-pages branch (GitHub Pages "Deploy from a branch").
// Needs no GitHub Actions / workflow permission. Usage: npm run deploy:pages
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const run = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32", ...opts });
  if (r.status !== 0) { console.error(`Failed: ${cmd} ${args.join(" ")}`); process.exit(r.status ?? 1); }
};
const out = (cmd, args) => spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32" }).stdout.trim();

run("node", ["scripts/build-pages.mjs"]);
if (!fs.existsSync("out/index.html")) { console.error("out/index.html missing"); process.exit(1); }

const remote = out("git", ["remote", "get-url", "origin"]);
const name = out("git", ["config", "user.name"]);
const email = out("git", ["config", "user.email"]);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gh-pages-"));
fs.cpSync("out", tmp, { recursive: true });
fs.writeFileSync(path.join(tmp, ".nojekyll"), "");
const git = (...a) => run("git", a, { cwd: tmp });
git("init", "-q", "-b", "gh-pages");
git("config", "user.name", name || "deploy");
git("config", "user.email", email || "deploy@users.noreply.github.com");
git("add", "-A");
git("commit", "-q", "-m", "Deploy static site");
git("push", "-f", remote, "gh-pages");
fs.rmSync(tmp, { recursive: true, force: true });
console.log("Published to gh-pages.");
