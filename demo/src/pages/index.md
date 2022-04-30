---
path: index.md
layout: ../layouts/MainLayout.astro
setup: |
  import src from "../images/elva-800w.jpg"
  import { Picture } from "astro-imagetools/components"
---

# Image Optimization in Astro with Astro ImageTools

This page demonstrates the usage of the [astro-imagetools](https://www.npmjs.com/package/astro-imagetools) library with live examples.

<hr />

## Components

- [`<Img />` Component](/components/Img)
- [`<Picture />` Component](/components/Picture)
- [`<BackgroundImage />` Component](/components/BackgroundImage)
- [`<BackgroundPicture />` Component](/components/BackgroundPicture)

## APIs

- [`renderImg` API](/api/renderImg)
- [`renderPicture` API](/api/renderPicture)
- [`renderBackgroundImage` API](/api/renderBackgroundImage)
- [`renderBackgroundPicture` API](/api/renderBackgroundPicture)

## Layout

The `layout` property tells the image to respond differently depending on the device size or the container size.

Select a layout below and try resizing the window or rotating your device to see how the image reacts.

- [Constrained Layout](/layout/constrained)
- [Fixed Layout](/layout/fixed)
- [Full Width Layout](/layout/fullWidth)
- [Fill Layout](/layout/fill)

<hr />

## Placeholder

The `placeholder` property tells the image what to show while loading.

- [Blurred Placeholder](/placeholder/blurred)
- [Dominant Color Placeholder](/placeholder/dominantColor)
- [Traced SVG Placeholder](/placeholder/tracedSVG)
- [No Placeholder](/placeholder/none)

<hr />

## Internal Image

The following is an example of a reference to an internal image.

<Picture src={src} alt="picture" />

<hr />

## External Image

The following is an example of a reference to an external image.

![A random image](https://picsum.photos/1024/768)

<hr />

## Learn More

You can optionally configure many more things!

Checkout the [Astro ImageTools](https://astro-imagetools-docs.vercel.app/) documentation to learn more.
