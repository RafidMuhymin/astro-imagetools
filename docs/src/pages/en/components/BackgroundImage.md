---
title: <BackgroundImage />
description: The <BackgroundImage /> Component Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `<BackgroundImage />` component offers **Background Image Optimization**. It uses the plain CSS `background-image` property to display the generated background image sets.

As the component is using the `background-image` property, it lacks the features provided by the HTML `<picture>` and `<img>` elements such as **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition**. But the component still offers **Art Direction** support and the ability to offer **multiple source formats**.

The browsers don't offer any native CSS API or feature to detect support for a specific source format and provide multiple source formats. So the `<BackgroundImage />` component depends on JavaScript to detect the support of the `webp` and `avif` formats.

To make the `<BackgroundImage />` component work, you need to import the [`<ImageSupportDetection />`](/en/components-and-apis#imagesupportdetection) component in the `<head>` of your **Layout** component. This component adds **655 bytes** to the generated pages.

The body of the `<BackgroundImage />` component will be used as the content of the container element.

> **Note:** Layouts don't make sense for background images. So, they aren't supported by the `<BackgroundImage />` component.

## Code Example

```astro
---
import {
  BackgroundImage,
  ImageSupportDetection,
} from "astro-imagetools/components";

const content = await fetch(import.meta.env.CONTENT_URL).then((r) => r.text());
---

<html>
  <head>
    <ImageSupportDetection />
  </head>

  <body>
    <BackgroundImage
      src="/src/images/landscape.jpg"
      artDirectives={[
        {
          src: "/src/images/portrait.jpg",
          media: "(orientation: potrait)",
        },
      ]}
    >
      <Fragment set:html={content} />
    </BackgroundImage>
  </body>
</html>
```

## Component Props

Below is the list of props that the `<BackgroundImage />` component accepts. Only the `src` prop is required.

<ConfigOptions component="BackgroundImage" />
