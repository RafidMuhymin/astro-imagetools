// @ts-check
import path from "path";
import crypto from "crypto";
import MagicString from "magic-string";
import { cwd } from "../../utils/runtimeChecks.js";

const regexTestPattern =
  /<img\s+src\s*=(?:"|')([^("|')]*)(?:"|')\s*alt\s*=\s*(?:"|')([^("|')]*)(?:"|')[^>]*>/;

const regexExecPattern =
  /(?<=(?:\$\$render`.*))<img\s+src\s*=(?:"|')([^("|')]*)(?:"|')\s*alt\s*=\s*(?:"|')([^("|')]*)(?:"|')[^>]*>(?=.*`)/gs;

export default async function transform(code, id) {
  if (id.endsWith(".md") && regexTestPattern.test(code)) {
    const { default: astroViteConfigs } = await import(
      // @ts-ignore
      "../../astroViteConfigs.js"
    );

    const { isSsrBuild, sourcemap } = astroViteConfigs;

    let matches;

    if ((matches = code.matchAll(regexExecPattern)) !== null) {
      const s = new MagicString(code);

      const uuid = crypto.randomBytes(4).toString("hex");

      const Picture = "Picture" + uuid;

      const renderComponent = "renderComponent" + uuid;

      s.prepend(
        `import { Picture as ${Picture} } from "astro-imagetools/components";\nimport { renderComponent as ${renderComponent} } from "${
          cwd + "/node_modules/astro/dist/runtime/server/index.js"
        }"\n;`
      );

      for (const match of matches) {
        const [matchedText, rawSrc, alt] = match;

        const src = rawSrc.match("(http://|https://|data:image/).*")
          ? rawSrc
          : path.resolve(path.dirname(id), rawSrc).replace(cwd, "");

        s.overwrite(
          match.index,
          match.index + matchedText.length,
          `\${${renderComponent}($$result, "${Picture}", ${Picture}, { "src": "${src}", "alt": "${alt}" })}`
        );
      }

      return {
        code: s.toString(),
        map: sourcemap ? s.generateMap({ hires: true }) : null,
      };
    }
  }
}
