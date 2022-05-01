// @ts-check
import { store } from "../plugin/index.js";
import { getCachedBuffer } from "../plugin/utils/cache.js";

export async function middleware(request, response) {
  const imageObject = store.get(request.url);

  if (imageObject) {
    const { hash, type, image, buffer } = imageObject;

    response.setHeader("Content-Type", type);
    response.setHeader("Cache-Control", "no-cache");

    return buffer || (await getCachedBuffer(hash, image));
  }
}
