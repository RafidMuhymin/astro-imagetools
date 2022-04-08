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

Register the Vite plugin provided by **Astro ImageTools** in your `astro.config.js` file:

```js
import astroImagePlugin from "astro-imagetools/plugin";

export default {
  vite: {
    plugins: [astroImagePlugin],
  },
};
```

Then, you'll be able to use the components and APIs inside Astro pages and components as shown below:

```astro
---
// import the components and APIs
import { Picture } from "astro-imagetools/components";
import { renderImg } from "astro-imagetools/api";

// Generate rendered HTML programmatically
const { link, style, img } = await renderImg({
  src: "https://picsum.photos/200/300",
  alt: "A random image",
});
---

<html>
  <body>
    <h1>Hello World!</h1>

    <!-- Use generated HTML -->
    <Fragment set:html={link + style + img} />

    <!-- Use the imported Picture component -->
    <Picture
      src="/src/images/landscape.jpg"
      alt="A landscape image"
      artDirectives={[
        {
          src: "/src/images/portrait.jpg",
          media: "(orientation: potrait)",
        },
      ]}
    />
  </body>
</html>
```
