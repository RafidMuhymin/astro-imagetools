---
title: renderBackgroundImage
description: The renderPicture API Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `renderBackgroundImage` API is a function for rendering an optimized and responsive **Background Images**. The CSS `background-image` property will be used to display the generated background images.

Similar to the [`<BackgroundImage />`](/en/components/BackgroundImage) component, the `renderBackgroundImage` API lacks the **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition** features. And it too depends on the [`<ImageSupportDetection />`](/en/components-and-apis#imagesupportdetection) component to work.

## Code Example

```astro
---
import { renderBackgroundImage } from "astro-imagetools/api";
import { ImageSupportDetection } from "astro-imagetools/components";

const content = await fetch(import.meta.env.CONTENT_URL).then((r) => r.text());

const { link, style, htmlElement } = await renderBackgroundImage({
  src: "https://picsum.photos/1024/768",
  content,
  artDirectives: [
    {
      src: "https://picsum.photos/1024/768?image=1",
      media: "(orientation: potrait)",
    },
  ],
});
---

<html>
  <head>
    <ImageSupportDetection />
  </head>

  <body>
    <Fragment set:html={link + style + htmlElement} />
  </body>
</html>
```

## Return Value

**Type:** `{ link: string; style: string; htmlElement: string }`

If the [`preload`](#preload) config option is set, then the `link` property will contain the `outerHTML` of the generated `<link />` element to preload the image set of the asked format. Otherwise, `link` will be an empty string.

If the [`placeholder`](#placeholder) config option is not set to `"none"`, then the `style` property will contain the `outerHTML` of the generated `<style />` element to display the placeholder image. Otherwise, `style` will be an empty string.

The `htmlElement` property will contain the `outerHTML` of the generated `HTMLElement` to apply the background image sets to. It's the primary return value of the `renderPicture` API.

Below is the list of configuration options supported by the `renderBackgroundImage` API. Only the `src` config is required.

## Configuration Options

<ConfigOptions api="renderBackgroundImage" />
