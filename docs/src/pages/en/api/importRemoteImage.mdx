---
title: importRemoteImage
description: The importRemoteImage API Documentation
layout: ../../../layouts/MainLayout.astro
---

The `importRemoteImage` API is a function which acts similar to the ESM `import()` function but supports remote URLs (data URIs are also supported). It returns a `Promise` which resolves to the `src/srcset` of the generated _asset_/_assets_. Just like what the name suggests, it only works with remote URLs.

## Code Example

```js
import React from "react";
import { importRemoteImage } from "astro-imagetools/api";

const src = await importRemoteImage("https://picsum.photos/1024/768");

export default function ReactImage() {
  return <img src={src} />;
}
```

You can pass configuration options via query parameters just like regular ESM imports.

```js
import { importRemoteImage } from "astro-imagetools/api";

const src = await importRemoteImage(
  "https://picsum.photos/1024/768?w=200&h=200&format=avif&q=80"
);
```

If you want the function to return a `srcset` instead of a `src`, pass multiple values to the `w` or `width` query parameter.

```js
import { importRemoteImage } from "astro-imagetools/api";

const srcset = await importRemoteImage(
  "https://picsum.photos/1024/768?w=200;400;800"
);
```

If the `globalImportRemoteImage` global config option is set to `true`, the `importRemoteImage` function will be available globally.

```js
const src = await importRemoteImage(
  "https://picsum.photos/1024/768?w=200&h=200&format=avif&q=80"
);
```

## Return Value

**Type:** `Promise<string>`
