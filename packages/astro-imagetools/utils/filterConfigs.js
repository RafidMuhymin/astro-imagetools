// @ts-check
import printWarning from "./printWarning.js";

export default function filterConfigs(
  type,
  configs,
  supportedConfigs,
  { warn = true } = {}
) {
  const clonedConfigs = { ...configs };

  Object.keys(clonedConfigs).forEach((key) => {
    if (!supportedConfigs.includes(key)) {
      warn && printWarning(key, type);

      delete clonedConfigs[key];
    }
  });

  return clonedConfigs;
}
