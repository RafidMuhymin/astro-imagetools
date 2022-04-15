---
title: renderPicture
description: The renderPicture API Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `renderPicture` API is a function for rendering an optimized and responsive images. The generated images will use the `<picture />` element. Similar to the [`<Picture />`](/en/components/Picture) component, it's for advanced use cases where you need to offer **multiple source formats**, **Art Direction**, and the **onload fade-in transition**.

## Code Example

```js
import { renderPicture } from "astro-imagetools/api";

const { link, style, picture } = renderPicture({
  src: "https://picsum.photos/1024/768",
  alt: "A random image",
  artDirectives: [
    {
      src: "https://picsum.photos/1024/768?image=1",
      media: "(orientation: potrait)",
    },
  ],
});
```

## Return Value

**Type:** `{ link: string; style: string; picture: string }`

If the [`preload`](#preload) config option is set, then the `link` property will contain the `outerHTML` of the generated `<link />` element to preload the image set of the asked format. Otherwise, `link` will be an empty string.

If the [`placeholder`](#placeholder) config option is not set to `"none"`, then the `style` property will contain the `outerHTML` of the generated `<style />` element to display the placeholder image. Otherwise, `style` will be an empty string.

The `img` property will contain the `outerHTML` of the generated `<picture />` element. It's the primary return value of the `renderPicture` API.

## Configuration Options

Below is the list of configuration options supported by the `renderPicture` API. Only the `src` and `alt` configs are required.

<ConfigOptions api="renderPicture" />
