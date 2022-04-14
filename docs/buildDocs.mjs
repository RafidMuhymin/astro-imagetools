import fs from "fs";
import util from "util";
import childProcess from "child_process";

const exec = util.promisify(childProcess.exec);

const apiDir = "./src/pages/en/api/";
const componentsDir = "./src/pages/en/components/";
const draftText = "---\ndraft: true";

const doAndUndoDrafting = async (dirPath, comamnd) => {
  await Promise.all(
    (
      await fs.promises.readdir(dirPath)
    ).map(async (filename) => {
      const fullPath = dirPath + filename;

      const raw = await fs.promises.readFile(fullPath, "utf8");

      await fs.promises.writeFile(
        fullPath,
        comamnd === "do"
          ? raw.replace("---", draftText)
          : raw.replace(draftText, "---")
      );
    })
  );
};

await doAndUndoDrafting(apiDir, "do");

console.log((await exec("pnpm build")).stdout);

await Promise.all([
  fs.promises.rename("./dist", "./dist_copy"),
  doAndUndoDrafting(apiDir, "undo"),
  doAndUndoDrafting(componentsDir, "do"),
]);

console.log((await exec("pnpm build")).stdout);

await Promise.all([
  fs.promises.rename("./dist_copy/en/components", "./dist/en/components"),
  doAndUndoDrafting(componentsDir, "undo"),
]);

await fs.promises.rm("./dist_copy", { recursive: true });
