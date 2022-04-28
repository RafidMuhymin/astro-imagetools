// @ts-check
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { store } from "../index.js";
import { saveAndCopyAsset } from "../utils/cache.js";

const filename = fileURLToPath(import.meta.url);

const astroViteConfigsPath = path.resolve(
  filename,
  "../../../astroViteConfigs.json"
);

const astroViteConfigs = JSON.parse(
  await fs.promises.readFile(astroViteConfigsPath, "utf8")
);

console.log(astroViteConfigs);

const { mode, outDir, assetsDir } = astroViteConfigs;

console.log({
  mode,
  outDir,
  assetsDir,
});

export default async function closeBundle() {
  if (mode === "production") {
    const allEntries = [...store.entries()];

    const assetPaths = allEntries.filter(([, { hash = null } = {}]) => hash);

    await Promise.all(
      assetPaths.map(
        async ([assetPath, { hash, image, buffer }]) =>
          await saveAndCopyAsset(
            hash,
            image,
            buffer,
            outDir,
            assetsDir,
            assetPath
          )
      )
    );
  }
}
