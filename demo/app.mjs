import fs from "fs";
import http from "http";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

http
  .createServer(async function (req, res) {
    await ssrHandler(req, res, async (err) => {
      if (err) {
        res.writeHead(500);
        res.end(err.toString());
      } else {
        const assetPath = `./dist/client${req.url}`;

        if (fs.existsSync(assetPath)) {
          const buffer = await fs.promises.readFile(assetPath);

          res.writeHead(200);

          res.end(buffer);
        } else {
          res.writeHead(404);
          res.end();
        }
      }
    });
  })
  .listen(8080);

console.log("Listening to Port 8080");
