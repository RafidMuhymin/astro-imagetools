// @ts-check
import { store } from "../index.js";
import { saveAndCopyAsset } from "../utils/cache.js";

export default async function closeBundle() {
  const { default: astroViteConfigs } = await import(
    // @ts-ignore
    "../../astroViteConfigs.js"
  );

  const { mode, outDir, assetsDir, isSsrBuild } = astroViteConfigs;

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
            assetPath,
            isSsrBuild
          )
      )
    );
  }
}
