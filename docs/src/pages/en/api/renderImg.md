---
title: renderImg
description: The renderImg API Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `renderImg` API is a function for rendering optimized and responsive images. The generated images will use the `<img />` element. Similar to the [`<Img />`](/en/components/Img) component, it's for simple use cases where you don't need advanced features like **Art Direction**, **multiple source formats**, or the **onload fade-in transition**.

## Configuration Options

Below is the list of configuration options supported by the `renderImg` API. Only the `src` and `alt` configs are required.

<ConfigOptions api="renderImg" />
