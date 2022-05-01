---
title: Deprecations & Migration Guide
description: Astro ImageTools Deprecations & Migration Guide
layout: ../../layouts/MainLayout.astro
---

### `v0.5.1`

The `<Image />` component and the `renderImage` API have been deprecated in favor of the new `<Img />` and `<Picture />` components and the `renderImg` and `renderPicture` APIs.

Currently, the `<Image />` component and the `renderImage` API are still available in the `astro-imagetools` package for backward-compatibility. They are aliased to the `<Picture />` component and the `renderPicture` API respectively.

They will be removed in the upcoming minor releases of **Astro ImageTools**. So, please migrate to the new `<Img />` and `<Picture />` components and the `renderImg` and `renderPicture` APIs as soon as possible.

### `v0.6.0`

The `<Image />` component and the `renderImage` API have been removed in the `v0.6.0` release.

And the Vite plugin now can't be registered directly. Instead, you have to add the Astro integration provided in the latest release in your `astro.config.mjs` file. The integration will handle registering the plugin and the other required things automatically.

```js
import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
  integrations: [astroImageTools],
});
```

> **Note:** According to the [Semantic Versioning](https://semver.org/) standard, any minor release before `v1.0.0` is considered _breaking_.
