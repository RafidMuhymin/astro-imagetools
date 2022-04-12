---
title: <BackgroundPicture />
description: The <BackgroundPicture /> Component Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

Similar to the [`<BackgroundImage />`](/backgroundimage) component, the `<BackgroundPicture />` component offers **Background Image Optimization**. But instead of using the `background-image` property, it uses the `<picture>` element with `z-index` set to `-1` to display the background image.

Unlike the `<BackgroundImage />` component, the `<BackgroundPicture />` supports **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition**. It doesn't need any JavaScript too.

> **Note:** Layouts don't make sense for background images. So, they aren't supported by the `<BackgroundPicture />` component.

## Component Props

Below is the list of props that the `<BackgroundPicture />` component accepts. Only the `src` prop is required.

<ConfigOptions component="BackgroundPicture" />
