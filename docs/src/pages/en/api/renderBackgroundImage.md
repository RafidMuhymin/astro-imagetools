---
title: renderBackgroundImage
description: The renderPicture API Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `renderBackgroundImage` API is a function for rendering an optimized and responsive **Background Images**. The CSS `background-image` property will be used to display the generated background images.

Similar to the [`<BackgroundImage />`](/en/components/BackgroundImage) component, the `renderBackgroundImage` API lacks the **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition** features. And it too depends on the [`<ImageSupportDetection />`](/en/components-and-apis#imagesupportdetection) component to work.

## Configuration Options

Below is the list of configuration options supported by the `renderBackgroundImage` API. Only the `src` config is required.

<ConfigOptions api="renderBackgroundImage" />
