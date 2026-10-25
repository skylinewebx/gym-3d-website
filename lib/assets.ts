import "server-only";
import fs from "node:fs";
import path from "node:path";

/** True when a file under /public exists. Lets pages show labelled placeholders until real media is dropped in. */
export function has(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}
