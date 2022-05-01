---
title: Markdown Images
description: Usage of Markdown Images with Astro ImageTools
layout: ../../layouts/MainLayout.astro
---

**Astro Imagetools** comes with built-in support for optimizing markdown images. The Vite plugin included in the package will detect images used inside markdown files. If found any, it will automatically generate the image sets using the source and alternative text as the `src` and `alt` props, and then it will replace the original string with them.

Like the `<Picture />` component, both absolute paths, remote, and data URIs are supported as the source path. But in addition to that, relative paths are also supported for markdown images. 🎉🎉🎉

In complex scenarios where you need more config options, you can pass them as query parameters. Or, if you have to set their values dynamically, you can import the `<Picture />` component (and any other components too)! **Astro** supports importing and using Astro components inside MD files. Check the official [Astro Markdown documentation](https://docs.astro.build/en/guides/markdown-content/#using-components-in-markdown) for more info on this.

> **Note:** Automatic markdown image optimization is supported only for markdown files. If you are using the `<Markdown />` component, you have to use the `<Picture />` component instead.
>
> Both the Markdown Syntax `![](...)` and HTML Syntax `<img src="..." alt="..." />` are supported.

### Example Markdown Images Usage

```md
---
src: https://picsum.photos/1024/768
alt: A random image
setup: |
  import { Picture } from "astro-imagetools/components";
---

# Hello Markdown Images

<!-- A remote image -->

![A random remote image](https://picsum.photos/1024/768)

<!-- A local image relative to the markdown file -->

![A local image](./images/landscape.jpg)

<!-- A local image relative to the project root -->

![Another local image](../src/images/landscape.jpg)

<!-- An example of using query params -->

![A remote image with query params](https://picsum.photos/1024/768?grayscale)

<!-- An example of the `<Image />` component inside MD pages -->

<Picture
  src={frontmatter.src}
  alt={frontmatter.alt}
/>
```
