export default function stringifyParams(obj) {
  const keys = Object.keys(obj);
  const params = keys.length
    ? keys
        .map((key) =>
          Array.isArray(obj[key])
            ? `&${key}=${obj[key].join(";")}`
            : `&${key}=${obj[key]}`
        )
        .join("")
    : "";
  return params;
}
