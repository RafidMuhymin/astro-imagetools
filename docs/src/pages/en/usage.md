---
title: Usage
description: Astro ImageTools Usage Guide
layout: ../../layouts/MainLayout.astro
---

Here is a brief overview on the usage of the Vite plugin, components and APIs provided by **Astro ImageTools**.

## Plugin Usage

<!-- The Vite plugin is used by the components and APIs interally to perform all kinds of image transformations and optimizations. After you register the Vite plugin as shown in the [Installation](/en/installation) documentation, it takes care of all the necessary configurations and starts looking image imports. -->

You can use the plugin to perform simple image transformations and optimizations on your own. It may come in handy in the scenarios where using the provided components and APIs is not possible.You can use the plugin inside framework components too!

```js
import React from "react";
// The Vite plugin will handle the below import automatically and return a path to the optimized image
import src from "../images/image.jpg";

export default function ReactImage() {
  return <img src={src} />;
}
```

You can pass configuration options via query parameters.

```js
import src from "../images/image.jpg?w=200&h=200&format=avif&q=80";
```

If you want the import to return a `srcset` instead of a `src`, pass multiple values to the `w` or `width` query parameter.

```js
import srcset from "../images/image.jpg?w=200;400;800";
```

## Components Usage

**Astro ImageTools** provides a set of components that abstract away all the complexities of image transformations and optimizations. The components are highly customizable and provide a number of excellent features.

All the components, `Img`, `Picture`, `BackgroundImage`, `BackgroundPicture`, and `ImageSupportDetection` are exported using named exports from `astro-imagetools/components`.

```astro
---
import { Picture } from "astro-imagetools/components";
---
```

You can pass configuration options to the components via props.

```astro
---
import { Picture } from "astro-imagetools/components";
---

<html>
  <body>
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

To know more about the components and available configuration options, please check out the [Components](/en/components-and-apis#components) documentation.

## APIs Usage

**Astro ImageTools** provides a set of APIs that allow you to generate the rendered HTML for the images programmatically.

All the APIs, `renderImg`, `renderPicture`, `renderBackgroundImage`, and `renderBackgroundPicture` are exported using named exports from `astro-imagetools/api`.

```astro
---
import { renderImg } from "astro-imagetools/api";
---
```

All the APIs support a single config object as the only argument. You can pass configuration options to the APIs via defining properties in the config object.

```astro
---
import { renderImg } from "astro-imagetools/api";

const { link, style, img } = await renderImg({
  src: "https://picsum.photos/1024/768",
  alt: "A random image",
});
---
```

To know more about the APIs and available configuration options, please check out the [APIs](/en/components-and-apis#api) documentation.
