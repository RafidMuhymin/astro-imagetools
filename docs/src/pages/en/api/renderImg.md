---
title: renderImg
description: The renderImg API Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `renderImg` API is a function for rendering optimized and responsive images. The generated images will use the `<img />` element. Similar to the [`<Img />`](/en/components/Img) component, it's for simple use cases where you don't need advanced features like **Art Direction**, **multiple source formats**, or the **onload fade-in transition**.

## Code Example

```js
import { renderImg } from "astro-imagetools/api";

const { link, style, img } = renderImg({
  src: "https://picsum.photos/1024/768",
  alt: "A random image",
});
```

## Return Value

**Type:** `{ link: string; style: string; img: string }`

If the [`preload`](#preload) config option is set, then the `link` property will contain the `outerHTML` of the generated `<link />` element to preload the image set of the asked format. Otherwise, `link` will be an empty string.

If the [`placeholder`](#placeholder) config option is not set to `"none"`, then the `style` property will contain the `outerHTML` of the generated `<style />` element to display the placeholder image. Otherwise, `style` will be an empty string.

The `img` property will contain the `outerHTML` of the generated `<img />` element. It's the primary return value of the `renderImg` API.

## Configuration Options

Below is the list of configuration options supported by the `renderImg` API. Only the `src` and `alt` configs are required.

<ConfigOptions api="renderImg" />
