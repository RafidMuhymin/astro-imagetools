---
title: renderPicture
description: The renderPicture API Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `renderPicture` API is a function for rendering an optimized and responsive images. The generated images will use the `<picture />` element. Similar to the [`<Picture />`](/en/components/Picture) component, it's for advanced use cases where you need to offer **multiple source formats**, **Art Direction**, and the **onload fade-in transition**.

## Configuration Options

Below is the list of configuration options supported by the `renderPicture` API. Only the `src` and `alt` configs are required.

<ConfigOptions api="renderPicture" />
