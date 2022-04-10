---
title: <Img />
description: Components and APIs provided by Astro ImageTools
layout: ../../../layouts/MainLayout.astro
setup: |
  import Src from "@config/src.astro"
  import Alt from "@config/alt.astro"
  import Sizes from "@config/sizes.astro"
  import Preload from "@config/preload.astro"
  import Loading from "@config/loading.astro"
  import Decoding from "@config/decoding.astro"
  import LayoutProp from "@config/layout.astro"
  import Placeholder from "@config/placeholder.astro"
  import BreakPoints from "@config/breakpoints.astro"
  import ObjectFit from "@config/objectFit.astro"
  import ObjectPosition from "@config/objectPosition.astro"
---

The `<Img />` component is an Astro component that renders an optimized and responsive `<img />` element. This component is for simple use cases where you don't need advanced features like **Art Direction**, **multiple source formats**, or the **onload fade-in transition**.

## Component Props

Below is the list of props that the `<Img />` component accepts. Only the `src` and `alt` props are required.

<Src component="Img" />
<Alt component="Img" />
<Sizes component="Img" />
<Preload component="Img" />
<Loading component="Img" />
<Decoding component="Img" />
<LayoutProp component="Img" />
<Placeholder component="Img" />
<BreakPoints component="Img" />
<ObjectFit component="Img" />
<ObjectPosition component="Img" />
