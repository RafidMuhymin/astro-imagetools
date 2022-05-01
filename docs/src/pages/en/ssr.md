---
title: SSR
description: Guide to using Astro ImageTools in SSR
layout: ../../layouts/MainLayout.astro
---

Recently, **Astro** has added experimental support for server-side rendering (SSR). To use **Astro ImageTools** in SSR, you need to have at least `v0.6.0` of the `astro-imagetools` package installed.

## How to use Astro ImageTools in SSR Mode

### Install the required dependencies

The `v0.6.0` release adds experimental support for server-side rendering (SSR). At this moment, only **Node.js** is supported. You need to have the `@astrojs/node` adapter and the latest version of `astro-imagetools` installed on your Astro project.

```bash
pnpm i @astrojs/node @astrojs/imagetools@^0.6.0
```

You need to have the latest version of `astro-imagetools` installed on the server too.

```bash
pnpm i @astrojs/imagetools@^0.6.0
```

To learn more about how to do set up the Node adapter and the Node server with **Astro**, please check out the [`@astrojs/node`](https://www.npmjs.com/package/@astrojs/node) readme.

### Use the exported `middleware`

Like any other component, the components and APIs provided by **Astro ImageTools** will be executed on the server. Due to how the Astro build process works, it's not possible to emit assets during the build process.

When handling the incoming requests on the server, you need to use the `middleware` exported by the `astro-imagetools` package. The `middleware` returns an instance of a `Buffer`.

**Code Example:**

```js
import http from "http";
import { middleware } from "astro-imagetools/ssr";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

http
  .createServer(function (req, res) {
    ssrHandler(req, res, async (err) => {
      if (err) {
        res.writeHead(500);
        res.end(err.toString());
      } else {
        const buffer = await middleware(req, res);

        if (buffer) {
          res.writeHead(200);
          res.end(buffer);
        } else {
          // Serve your other static assets or return 404
          res.writeHead(404);
          res.end();
        }
      }
    });
  })
  .listen(8080);
```

### Notes

The components and APIs provided by **Astro ImageTools** will be executed on the server. So, the path that you have provided via the `src` property won't exist on the server. This limitation applies for local images only.

To use local images with SSR, you have to generate assets for them first and then you have to pass the path to the assets to the `src` property.

Below is an example of how to do this.

```astro
---
import src from "../images/image.jpg?raw";
import { Picture } from "astro-imagetools/components";
---

<Picture {src} alt="A local image" />
```

> The `raw` query parameter has been used to tell the internal Vite plugin to emit the asset from the source image unchanged.
