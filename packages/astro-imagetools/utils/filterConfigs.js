// @ts-check
import printWarning from "./printWarning.js";

export default function filterConfigs(
  type,
  configs,
  supportedConfigs,
  { warn = true } = {}
) {
  const clonedConfigs = { ...configs };

  const requiredConfigs = [];

  type !== "Global" && requiredConfigs.push("src");

  ["Img", "Picture"].includes(type) && requiredConfigs.push("alt");

  requiredConfigs.forEach((key) => {
    if (!clonedConfigs[key]) {
      throw new Error(`The "${key}" property is required by ${type}`);
    }
  });

  Object.keys(clonedConfigs).forEach((key) => {
    if (!supportedConfigs.includes(key)) {
      warn && printWarning({ key, type });

      delete clonedConfigs[key];
    }
  });

  return clonedConfigs;
}
