---
title: Installation
description: Astro ImageTools Installation Guide
layout: ../../layouts/MainLayout.astro
---

To install the `astro-imagetools` package, run the following command:

```bash
npm install astro-imagetools

# yarn
yarn add astro-imagetools

# pnpm
pnpm add astro-imagetools
```

Register the _Astro Integration_ provided by **Astro ImageTools** in your `astro.config.mjs` file:

```js
import { astroImageTools } from "astro-imagetools";

export default {
  integration: [astroImageTools],
};
```

Then, you'll be able to use the components and APIs inside your Astro pages and components. To know more about how to use the components and APIs, please check out the [Usage](/en/usage) documentation.
