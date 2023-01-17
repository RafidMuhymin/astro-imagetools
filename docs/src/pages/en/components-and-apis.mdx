---
title: Components and APIs
description: Components and APIs provided by Astro ImageTools
layout: ../../layouts/MainLayout.astro
---

Here is a brief overview on the components and APIs provided by **Astro ImageTools**.

## Components

### `<Img />`

The `<Img />` component is an Astro component that renders an optimized and responsive `<img />` element. This component is for simple use cases where you don't need advanced features like **Art Direction**, **multiple source formats**, or the **onload fade-in transition**.

#### Example Usage of `<Img />`

```astro
---
import { Img } from "astro-imagetools/components";
---

<Img src="https://picsum.photos/1024/768" alt="A random image" />
```

To know more about the `<Img />` component and the available configuration options, please check out the [`<Img />`](/en/components/Img) documentation.

### `<Picture />`

The `<Picture />` component is an Astro component that renders an optimized and responsive `<picture />` element. This component supports all the features that **Astro ImageTools** has to offer for regular images. It's for advanced use cases where you need to offer **multiple source formats**, need **Art Direction**, and the **onload fade-in transition**. It's the component that you may want to use most of the times.

#### Example Usage of `<Picture />`

```astro
---
import { Picture } from "astro-imagetools/components";
---

<Picture
  src="/src/images/landscape.jpg"
  alt="A landscape image"
  artDirectives={[
    {
      src: "/src/images/portrait.jpg",
      media: "(orientation: potrait)",
    },
  ]}
/>
```

To know more about the `<Picture />` component and the available configuration options, please check out the [`<Picture />`](/en/components/Picture) documentation.

### `<BackgroundImage />`

The `<BackgroundImage />` component offers **Background Image Optimization**. It uses the plain CSS `background-image` property to display the background image.

As the component is using the `background-image` property, it lacks the features provided by the HTML `<picture>` and `<img>` elements such as **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition**. But it still offers **Art Direction** and the ability to offer **multiple source formats**.

The browesrs don't offer any native CSS API or feature to detect support for a specific source format and provide multiple source formats. So the `<BackgroundImage />` component depends on JavaScript to detect the support of the `webp` and `avif` formats.

To make the `<BackgroundImage />` component work, you need to import the [`<ImageSupportDetection />`](#imagesupportdetection) component in the `<head>` of your **Layout** component. This component adds **655 bytes** to the generated pages.

The body of the `<BackgroundImage />` component will be used as the content of the container element.

> **Note:** Layouts don't make sense for background images. So, they aren't supported by the `<BackgroundImage />` component.

#### Example Usage of `<BackgroundImage />`

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

To know more about the `<BackgroundImage />` component and the available configuration options, please check out the [`<BackgroundImage />`](/en/components/BackgroundImage) documentation.

### `<BackgroundPicture />`

Similar to the [`<BackgroundImage />`](#backgroundimage) component, the `<BackgroundPicture />` component offers **Background Image Optimization**. But instead of using the `background-image` property, it uses the `<picture>` element with `z-index` set to `-1` to display the background image.

Unlike the `<BackgroundImage />` component, the `<BackgroundPicture />` supports **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition**. It doesn't need any JavaScript too.

The body of the `<BackgroundPicture />` component will be used as the content of the container element.

> **Note:** Layouts don't make sense for background images. So, they aren't supported by the `<BackgroundPicture />` component.

#### Example Usage of `<BackgroundPicture />`

```astro
---
import { BackgroundPicture } from "astro-imagetools/components";

const content = await fetch(import.meta.env.CONTENT_URL).then((r) => r.text());
---

<BackgroundPicture
  src="/src/images/landscape.jpg"
  artDirectives={[
    {
      src: "/src/images/portrait.jpg",
      media: "(orientation: potrait)",
    },
  ]}
>
  <Fragment set:html={content} />
</BackgroundPicture>
```

To know more about the `<BackgroundPicture />` component and the available configuration options, please check out the [`<BackgroundPicture />`](/en/components/BackgroundPicture) documentation.

### `<ImageSupportDetection />`

The `<ImageSupportDetection />` component is a dependency of the `<BackgroundImage />` components. It's used to detect the support of the `webp` and `avif` formats and make the `<BackgroundImage />` component work.

> **Note:** The `<ImageSupportDetection />` component is needed by the `<BackgroundImage />` component because of a bug in the `astro` package that prevents hoisted scripts from being included in the generated pages if they are coming from Astro components inside an **npm package**. Once the bug is fixed, the `<ImageSupportDetection />` component can be removed.
>
> However, you'll still need it if you use the `renderBackgroundImage` API.
>
> The component doesn't have any configuration options.

## APIs

### `renderImg`

The `renderImg` API is a function for rendering optimized and responsive images. The generated images will use the `<img />` element. Similar to the [`<Img />`](#img) component, it's for simple use cases where you don't need advanced features like **Art Direction**, **multiple source formats**, or the **onload fade-in transition**.

#### Example Usage of `renderImg`

```js
import { renderImg } from "astro-imagetools/api";

const { link, style, img } = await renderImg({
  src: "https://picsum.photos/1024/768",
  alt: "A random image",
});
```

To know more about the `renderImg` API and the available configuration options, please check out the [`renderImg`](/en/api/renderimg) documentation.

### `renderPicture`

The `renderPicture` API is a function for rendering an optimized and responsive images. The generated images will use the `<picture />` element. Similar to the [`<Picture />`](#picture) component, it's for advanced use cases where you need to offer **multiple source formats**, **Art Direction**, and the **onload fade-in transition**.

#### Example Usage of `renderPicture`

```js
import { renderPicture } from "astro-imagetools/api";

const { link, style, picture } = await renderPicture({
  src: "https://picsum.photos/1024/768",
  alt: "A random image",
  artDirectives: [
    {
      src: "https://picsum.photos/1024/768?image=1",
      media: "(orientation: potrait)",
    },
  ],
});
```

To know more about the `renderPicture` API and the available configuration options, please check out the [`renderPicture`](/en/api/renderpicture) documentation.

### `renderBackgroundImage`

The `renderBackgroundImage` API is a function for rendering an optimized and responsive **Background Images**. The CSS `background-image` property will be used to display the generated background images.

Similar to the [`<BackgroundImage />`](#backgroundimage) component, the `renderBackgroundImage` API lacks the **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition** features. And it too depends on the [`<ImageSupportDetection />`](#imagesupportdetection) component to work.

#### Example Usage of `renderBackgroundImage`

```astro
---
import { renderBackgroundImage } from "astro-imagetools/api";
import { ImageSupportDetection } from "astro-imagetools/components";

const content = await fetch(import.meta.env.CONTENT_URL).then((r) => r.text());

const { link, style, htmlElement } = await renderBackgroundImage({
  src: "https://picsum.photos/1024/768",
  content,
  artDirectives: [
    {
      src: "https://picsum.photos/1024/768?image=1",
      media: "(orientation: potrait)",
    },
  ],
});
---

<html>
  <head>
    <ImageSupportDetection />
  </head>

  <body>
    <Fragment set:html={link + style + htmlElement} />
  </body>
</html>
```

To know more about the `renderBackgroundImage` API and the available configuration options, please check out the [`renderBackgroundImage`](/en/api/renderbackgroundimage) documentation.

### `renderBackgroundPicture`

The `renderBackgroundPicture` API is a function for rendering an optimized and responsive **Background Images**. The generated images will be displayed as the background using the `<picture>` element with `z-index` set to `-1`.

Unlike the [`renderBackgroundImage`](#renderbackgroundimage) API, the `renderBackgroundPicture` API supports **Lazy Loading**, **Asynchronous Decoding**, the `sizes` attribute, and the **onload fade-in transition**. It doesn't need any JavaScript too.

#### Example Usage of `renderBackgroundPicture`

```js
import { renderBackgroundPicture } from "astro-imagetools/api";

const content = await fetch(import.meta.env.CONTENT_URL).then((r) => r.text());

const { link, style, htmlElement } = await renderBackgroundPicture({
  src: "https://picsum.photos/1024/768",
  artDirectives: [
    {
      src: "https://picsum.photos/1024/768?image=1",
      media: "(orientation: potrait)",
    },
  ],
});
```

To know more about the `renderBackgroundPicture` API and the available configuration options, please check out the [`renderBackgroundPicture`](/en/api/renderbackgroundpicture) documentation.
