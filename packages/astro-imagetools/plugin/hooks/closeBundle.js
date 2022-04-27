// @ts-check
import { saveAndCopyAsset } from "../utils/cache.js";

export default async function closeBundle({
  store,
  outDir,
  assetsDir,
  viteConfig,
}) {
  if (viteConfig.mode === "production") {
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
