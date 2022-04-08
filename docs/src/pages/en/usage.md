---
title: Usage
description: Astro ImageTools Usage Guide
layout: ../../layouts/MainLayout.astro
---

**Astro ImageTools** provides a Vite plugin, five components and four APIs. Read below for guidance on how to use them.

## Plugin Usage

The Vite plugin is used by the components and APIs interally to perform all kinds of image transformations and optimizations. After you register the Vite plugin as shown in the [Installation](/en/installation) documentation, it takes care of all the necessary configurations and starts looking image imports.

The plugin may come in handy in the scenarios where using the provided components and APIs is not possible. You can use the plugin to perform image transformations and optimizations on your own. The plugin works inside framework components too!

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

## Components Usage

**Astro ImageTools** provides a set of components that handle image transformations and optimizations and provide a simple and intuitive API using props. The components and are highly customizable. And they provide a number of excellent [features](/en/introduction#features).

All the components, `Img`, `Picture`, `BackgroundImage`, `BackgroundPicture`, and `ImageSupportDetection` are exported using named exports from `astro-imagetools/components`.

```astro
---
// import the component you want to use
import { Picture } from "astro-imagetools/components";
---

<html>
  <body>
    <h1>Hello World!</h1>

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

To know more about the components and available configuration options, please check out the [Components](/en/components) documentation.

## APIs Usage

**Astro ImageTools** provides a set of APIs that handle image transformations and optimizations and provide a simple and intuitive API. The APIs provide a lot of flexibility and are highly customizable. And they provide a number of excellent [features](/en/introduction#features).

All the APIs, `renderImg`, `renderPicture`, `renderBackgroundImage`, and `renderBackgroundPicture` are exported using named exports from `astro-imagetools/api`.

```astro
---
// import the API you want to use
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
  </body>
</html>
```

To know more about the APIs and available configuration options, please check out the [API](/en/api) documentation.
