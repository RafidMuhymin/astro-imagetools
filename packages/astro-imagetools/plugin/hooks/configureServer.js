// @ts-check
import stream from "stream";
import { store } from "../index.js";
import { getCachedBuffer } from "../utils/cache.js";

export default function configureServer(server) {
  server.middlewares.use(async (request, response, next) => {
    const imageObject = store.get(request.url);

    if (imageObject) {
      const { hash, type, image, buffer } = imageObject;

      response.setHeader("Content-Type", type);
      response.setHeader("Cache-Control", "no-cache");

      return stream.Readable.from(
        buffer || (await getCachedBuffer(hash, image))
      ).pipe(response);
    }

    next();
  });
}
