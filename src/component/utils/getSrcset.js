// @ts-check

export default async function getSrcset(src, breakpoints, format, options) {
  options = {
    format,
    w: breakpoints,
    ...options,
  };

  // @ts-ignore
  const load = global.vitePluginContext?.load;

  const keys = Object.keys(options);

  const params = keys.length
    ? keys
        .map((key) =>
          Array.isArray(options[key])
            ? `&${key}=${options[key].join(";")}`
            : `&${key}=${options[key]}`
        )
        .join("")
    : "";

  const id = `${src}?${params.slice(1)}`;

  const srcset = load
    ? (await load({ id })).code.slice(16).slice(0, -1)
    : (await import(id)).default;

  return srcset;
}
