---
title: <Img />
description: The <Img /> Component Documentation
layout: ../../../layouts/MainLayout.astro
setup: |
  import ConfigOptions from "../../../components/ConfigOptions.astro";
---

The `<Img />` component is an Astro component that renders an optimized and responsive `<img />` element. This component is for simple use cases where you don't need advanced features like **Art Direction**, **multiple source formats**, or the **onload fade-in transition**.

## Code Example

```astro
---
import { Img } from "astro-imagetools/components";
---

<Img src="https://picsum.photos/1024/768" alt="A random image" />
```

## Component Props

Below is the list of props that the `<Img />` component accepts. Only the `src` and `alt` props are required.

<ConfigOptions component="Img" />
