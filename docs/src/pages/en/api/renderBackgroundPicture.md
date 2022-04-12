---
title: renderBackgroundPicture
description: The renderBackgroundPicture API Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `renderBackgroundPicture` API is a function for rendering an optimized and responsive **Background Images**. The generated images will be displayed as the background using the `<picture>` element with `z-index` set to `-1`.

Unlike the [`renderBackgroundImage`](/en/api/renderBackgroundImage) API, the `renderBackgroundPicture` API supports **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition**. It doesn't need any JavaScript too.

## Configuration Options

Below is the list of configuration options supported by the `renderBackgroundPicture` API. Only the `src` config is required.

<ConfigOptions api="renderBackgroundPicture" />
