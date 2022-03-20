# Astro ImageTools

**Astro ImageTools** is a collection of tools for optimizing and generating responsive images for the **Astro JS** framework.

## Installation

To install the package, run the following command:

```bash
npm install astro-imagetools

# yarn
yarn add astro-imagetools

# pnpm
pnpm add astro-imagetools
```

The `astro-imagetools` package comes with mainly three things, the `<Image />` component, a _Vite_ plugin and a `renderImage` function for programmatically generating image sets.

To use the component, first you have to register the plugin in your `astro.config.js` file:

```js
import astroImagePlugin from "astro-imagetools/plugin";

export default {
  vite: {
    plugins: [astroImagePlugin],
  },
};
```

Then, you'll be able to use the component inside your Astro components as shown below:

```astro
---
import Image from "astro-imagetools";
---

<html>
  <body>
    <h1>Hello World!</h1>
    <Image
      src="/src/images/landscape.jpg"
      alt="alt text"
      artDirectives={[
        {
          src: "/src/images/portrait.jpg",
          media: "(orientation: potrait)",
        },
      ]}
    />
  </body>
</html>
```

If you want to generate optimized image sets programmatically, you can use the `renderImage` function as shown below:

```astro
---
import renderImage from "astro-imagetools/renderImage";

const { image, link, style } = await renderImage({
  src: "/src/images/landscape.jpg",
  alt: "A landscape image",
  artDirectives: [
    {
      media: "(orientation: potrait)",
      src: "/src/images/portrait.jpg",
    },
  ],
});
---

<html>
  <body>
    <h1>Hello World!</h1>
    <Fragment set:html={link + style + image} />
  </body>
</html>
```

## APIs

As said above, the `astro-imagetools` package comes with three things, the `<Image />` component, a _Vite_ plugin and a `renderImage` function for programmatically generating image sets. The short description of each of them and their key features are mentioned below:

### The `<Image />` component

The `<Image />` component is an Astro component for generating responsive and optimized images. The main features of the component are:

- It outputs an actual `<picture>` element with the `<source>` and `<img>` elements required for generating responsive image sets and art directed images.
- It supports both local and remote images, data URIs are supported too! (Check the [`src`](#src) prop)
- It caches the generated output to improve performance in development.
- It provides a simple way to define art directions. Pass array of objects that contain a media query and an src. Done! (Check the [`artDirectives`](#artdirectives) prop)
- It calculates the required breakpoints in a really unique way (Check the [`breakpoints`](#breakpoints) prop)
- It not only supports tracing SVGs but also posterizing them (Check the [`tracedSVG`](#tracedsvg) property of the [`formatOptions`](#formatoptions) object prop)`])
- It can automatically add preload hints for you (Check the [`preload`](#preload) prop)
- It supports passing config options as query params too (Check [Configuration Options](#configuration-options))
- It supports four kind of layouts, `constrained` (default), `fixed`, `fullWidth` & `fill` (Check the [`layout`](#layout) prop)
- It supports three kinds of placeholder images, `blurred` (default), `dominantColor` & tracedSVG (Check the [`placeholder`](#placeholder) prop)
- Doesn't produce any global CSS, all styles generated are scoped to the `<Image />` component!
- And many more! Check the long list of [configuration options](#configuration-options) below.

> **Note:** The `<Image />` component returns a `<img>` element if generating only one image set is required.

### The `renderImage` function

The `renderImage` function is an alternative to the `<Image />` component that allows you to generate image sets programmatically. It takes the same arguments as the props of the `<Image />` component. The function returns a promise that resolves to an object which contains the following properties:

- `link`: The `<link>` element HTML for preloading the image set when the `preload` (Check [preload](#preload)) prop is passed.
- `style`: The `<style>` element HTML for styling the `<picture>` element.
- `image`: The `<picture>` or `<img>` element HTML that contains the generated image set or sets.

### The Vite plugin

The `<Image />` component can't work on its own without the vite plugin. The vite plugin performs all the transformations required to generate the image sets behind the scenes.

And it allows you to import images and add them to the assets graph in the situations when the `<Image />` component or the `renderImage` function can't be used.

## Markdown Images

**Astro Imagetools** comes with built-in support for optimizing markdown images. The Vite plugin included in the package is able to detect if images are used inside markdown files using the `![](...)` syntax. If found any, it will automatically generate the image sets using the source and alternative text as the `src` and `alt` props, and then it will replace the original string with them.

Like the `<Image />` component both absolute paths, remote URLs and data URIs are supported as source path. But in addition to that relative paths are also supported as source path for markdown images. 🎉🎉🎉

In more complex scenarios where you have to pass more config options or dynamically adjust them, you can use the `<Image />` component. **Astro** supports importing and using Astro components inside MD files. For more information, check the official [Astro Markdown documentation](https://docs.astro.build/en/guides/markdown-content/#using-components-in-markdown).

### Example Markdown Images Usage

```md
---
src: https://picsum.photos/1024/768
alt: A random image
setup: |
  import Image from "astro-imagetools";
---

# Hello Markdown Images

<!-- A remote image -->

![A random remote image](https://picsum.photos/1024/768)

<!-- A local image relative to the markdown file -->

![A local image](./images/landscape.jpg)

<!-- A local image relative to the project root -->

![Another local image](../src/images/landscape.jpg)

<!-- An example of the `<Image />` component inside MD pages -->

<Image
  src={frontmatter.src}
  alt={frontmatter.alt}
/>
```

> **Note:** Automatic markdown image optimization is only supported for markdown files. You have to use the `<Image />` component if you are using the `<Markdown />` component.

<!-- TODO: Plugin Configuration Documentation -->

## Configuration Options

Both the `<Image />` component and the `renderImage` function supports a total of 40 config options! You can pass them directly to the component as props and to the function as properties of an object parameter.

The `<Image />` component and the `renderImage` function support passing the configuration options as query params too. But the props will take precedence over the query params. And you may be able to pass only the simple ones as query params because in complex cases it's not possible to properly parse them.

### Example Configuration Options Usage

#### `<Image />` Component

```astro
<Image src="/src/images/landscape.jpg" alt="alt text" />

<!-- Query params -->
<Image src="/src/images/landscape.jpg?alt=alt text" />
```

#### `renderImage` Function

```js
const { link, style, image } = await renderImage({
  src: "/src/images/landscape.jpg",
  alt: "alt text",
});

// Query params
const { link, style, image } = await renderImage({
  src: "/src/images/landscape.jpg?alt=alt text",
});
```

### TypeScript Interface

The `ImageConfig` interface below describes the config options supported by both the `<Image />` component and the `renderImage` function.

This section is only for quick reference and for users familiar with _TypeScript_. If you are not comfortable with `TypeScript` or need more information, you can skip this section and move on to the next section for a more detailed explanation with code examples.

**Note:** The `<Image />` component and the vite plugin fallback to `@astropub/codecs` for processing images if the environment is unable to install `sharp`. Most of the properties defined in the `ImagetoolsConfig` interface won't be available in this case.

```ts
declare type format =
  | "heic"
  | "heif"
  | "avif"
  | "jpg"
  | "jpeg"
  | "png"
  | "tiff"
  | "webp"
  | "gif";

declare type PotraceOptions = TraceOptions | PosterizeOptions;

declare interface SharedTracingOptions {
  turnPolicy?: "black" | "white" | "left" | "right" | "minority" | "majority";
  turdSize?: number;
  alphaMax?: number;
  optCurve?: boolean;
  optTolerance?: number;
  threshold?: number;
  blackOnWhite?: boolean;
  color?: "auto" | string;
  background?: "transparent" | string;
}

declare interface TraceOptions {
  function?: "trace";
  options?: SharedTracingOptions;
}

declare interface PosterizeOptions {
  function?: "posterize";
  options?: SharedTracingOptions & {
    fill?: "spread" | "dominant" | "median" | "mean";
    ranges?: "auto" | "equal";
    steps?: number | number[];
  };
}

declare interface FormatOptions {
  format?: format | format[] | [] | null;
  fallbackFormat?: format;
  includeSourceFormat?: boolean;
  formatOptions?: Record<format, ImageToolsConfigs> & {
    tracedSVG?: PotraceOptions;
  };
}

declare interface ImageToolsConfigs {
  flip?: boolean;
  flop?: boolean;
  invert?: boolean;
  flatten?: boolean;
  normalize?: boolean;
  grayscale?: boolean;
  hue?: number;
  saturation?: number;
  brightness?: number;
  w?: number;
  h?: number;
  ar?: number;
  width?: number;
  height?: number;
  aspect?: number;
  background?: string;
  tint?: string;
  blur?: number | boolean;
  median?: number | boolean;
  rotate?: number;
  quality?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  kernel?: "nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3";
  position?:
    | "top"
    | "right top"
    | "right"
    | "right bottom"
    | "bottom"
    | "left bottom"
    | "left"
    | "left top"
    | "north"
    | "northeast"
    | "east"
    | "southeast"
    | "south"
    | "southwest"
    | "west"
    | "northwest"
    | "center"
    | "centre"
    | "cover"
    | "entropy"
    | "attention";
}

declare interface ArtDirective
  extends PrimaryProps,
    FormatOptions,
    ImageToolsConfigs {
  media: string;
}

declare type sizesFunction = {
  (breakpoints: number[]): string;
};

declare type breakpointsFunction = {
  (imageWidth: number): number[];
};

declare interface PrimaryProps {
  src: string;
  sizes?: string | sizesFunction;
  objectPosition?: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  placeholder?: "dominantColor" | "blurred" | "tracedSVG" | "none";
  breakpoints?:
    | number[]
    | breakpointsFunction
    | {
        count?: number;
        minWidth?: number;
        maxWidth?: number;
      };
}

export interface ImageConfig
  extends PrimaryProps,
    FormatOptions,
    ImageToolsConfigs {
  alt: string;
  preload?: format;
  loading?: "lazy" | "eager" | "auto" | null;
  decoding?: "async" | "sync" | "auto" | null;
  layout?: "constrained" | "fixed" | "fullWidth" | "fill";
  artDirectives?: ArtDirective[];
}
```

<!-- TODO: Create GIF/Video demonstrations of the `layout` and `placeholder` props -->

### `ImageConfig`

The `ImageConfig` interface is the main interface used to define the configuration options that extends the [`PrimaryProps`](#primaryprops), [`FormatOptions`](#formatoptions), and [`ImageToolsConfigs`](#imagetoolsconfigs) interfaces. All the properties except `src` and `alt` are optional.

#### alt

**Type:** `string`

**Default:** `undefined`

The value of the `alt` attribute of the `<img />` element.

**Code example:**

```astro
<Image
  src="https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg"
  alt="A father holiding his beloved daughter in his arms"
/>
```

#### preload

**Type:** `format`

**Default:** `undefined`

Whether to preload the image or not or what format of image to preload.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" preload="avif"
/>
```

#### loading

**Type:** `"lazy" | "eager" | "auto" | null`

**Default:** `preload ? "eager" : "lazy"`

The value of the `loading` attribute of the `<img />` element. If `null` is provided, the `loading` attribute will be omitted.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" loading="eager"
/>
```

#### decoding

**Type:** `"async" | "sync" | "auto" | null`

**Default:** `"async"`

The value of the `decoding` attribute of the `<img />` element. If `null` is provided, the `decoding` attribute will be omitted.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" decoding="sync"
/>
```

#### layout

**Type:** `"constrained" | "fixed" | "fullWidth" | "fill"`

**Default:** `"constrained"`

The layout mode to determine the resizing behavior of the image in the browser.

In `constrained` mode, the image will occupy full width of the container with `max-width` set to its width. The height of the image will be calculated based on the aspect ratio of the image. The image will be scaled down to fit the container but won't be enlarged.

In `fixed` mode, the image will have a fixed width and height. The `width` and `height` props will be used to set the width and height of the image. The image won't be scaled down nor enlarged.

In `fullWidth` mode, the image will be scaled up or down to occupy the full width of the container. The height of the image will be calculated based on the aspect ratio of the image.

In `fill` mode, the image will be scaled up or down to fill the entire width and height of the container.

**Code example:**

<!-- prettier-ignore -->
```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  layout="fixed"
/>
```

#### fadeInTransition

**Type:** `boolean` | `number` | [`KeyframeEffectOptions`](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#:~:text=options%20Optional,above%29.%20Defaults%20to%20replace.)

**Default:** `true`

Whether or not to fade in the image when it is loaded. If a number is provided, it will be used as the duration of the transition. If an object is provided it will be used as the options for the [`element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) method.

> **Note:** This prop is only available when the `placeholder` prop of at least one source is not `"none"`.

#### artDirectives

**Type:** `ArtDirective[]`

**Default:** `undefined`

The array of art directives to apply to the image. Check the `ArtDirective` interface for more details.

**Code example:**

```astro
<Image
  src="/src/image/landscape.jpg"
  alt="A landscape image"
  artDirectives={[
      {
        src: "/src/image/dark-potrait.jpg",
        media: "(prefers-color-scheme: dark) and (orientation: portrait)",
      },
      {
        src: "/src/image/light-potrait.jpg",
        media: "(prefers-color-scheme: light) and (orientation: portrait)",
      },
      {
        src: "/src/image/dark-landscape.jpg",
        media: "(prefers-color-scheme: dark) and (orientation: landscape)",
      },
      }
  ]
  }
/>
```

### `PrimaryProps`

The properties defined in the `PrimaryProps` interface are some of the primary configuration options. The [`ImageConfig`](#imageconfig) interface and the [`ArtDirective`](#artdirective) interface extend this interface. All the properties except `src` are optional.

#### src

**Type:** `string`

**Default:** `undefined`

The absolute path to the source image stored in the file system or the URL of the image. Data URIs are also supported. The `src` property is required.

**Code example:**

```astro
<!-- Local image -->
<Image src="/src/images/image.jpg" alt="A local image" />

<!-- Remote image -->
<Image src="https://example.com/image.jpg" alt="A remote image" />

<!-- Data URI -->
<Image
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  alt="A base64 encoded image"
/>
```

#### sizes

**Type:** `string` or `(breakpoints: number[]) => string`

**Default:** `` (breakpoints) => `(min-width: ${breakpoints.at(-1)}px) ${breakpoints.at(-1)}px, 100vw ``

A string or function that returns a string suitable for the value of the `sizes` attribute of the `<img />` element. The final calculated breakpoints are passed to the function as a parameter.

**Code example:**

```astro
<!-- string type -->
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  sizes="(min-width: 400px) 400px, 100vw"
/>

<!-- function type -->
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  sizes={(breakpoints) => {
    const maxWidth = breakpoints.at(-1);
    return `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`;
  }}
/>
```

#### objectPosition

**Type:** `string`

**Default:** `50% 50%`

The value of the `object-position` CSS property of the `<img />` element.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  objectPosition="top left"
/>
```

#### objectFit

**Type:** `"fill" | "contain" | "cover" | "none" | "scale-down"`

**Default:** `"cover"`

The value of the `object-fit` CSS property of the `<img />` element.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  objectFit="contain"
/>
```

#### placeholder

**Type:** `"dominantColor" | "blurred" | "tracedSVG" | "none"`

**Default:** `"blurred"`

The placeholder to be displayed while the image is loading. If `placeholder` is set to `"dominantColor"`, the dominant color of the image will be used as the placeholder. If it is set to `"blurred"`, a very low-resolution version of the provided image will be enlarged and used as the placeholder. If it is set to `"tracedSVG"`, a traced SVG of the image will be used as the placeholder. If it is set to `"none"`, no placeholder will be displayed.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  placeholder="dominantColor"
/>
```

#### breakpoints

**Type:** `number[] | { count?: number; minWidth?: number; maxWidth?: number }`

**Default:** `undefined`

An array of widths in pixels to generate image sets for. If not provided, the breakpoints will be calculated automatically.

If an object is passed then the breakpoints will be calculated based on `count`, `minWidth`, and `maxWidth` properties. The `count` property is to specify the number of breakpoints to generate. The `minWidth` and `maxWidth` properties are to specify the widths to generate in the range between their values.

When an object is passed or the `breakpoints` prop is not provided, the breakpoints are calculated using a simple formula/algorithm. Instead of explaining the complete algorithm here, I am linking to the [source code](https://github.com/RafidMuhymin/astro-imagetools/blob/main/src/component/utils/getBreakpoints.js) of it.

**Code example:**

```astro
<!-- number[] type -->
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  breakpoints={[200, 400, 800, 1600]}
/>

<!-- { count?: number; minWidth?: number; maxWidth?: number } type -->
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  breakpoints={{ count: 5, minWidth: 200, maxWidth: 1600 }}
  /* five breakpoints will be generated ranging from 200px to 1000px */
/>
```

### `FormatOptions`

The `FormatOptions` interface defines the configuration options related to generating image sets for different formats supported by the `<Image />` component. The [`ImageConfig`](#imageconfig) interface and the [`ArtDirective`](#artdirective) interface extend this interface.

The formats supported by the `<Image />` component are:

```ts
declare type format =
  | "heic"
  | "heif"
  | "avif"
  | "jpg"
  | "jpeg"
  | "png"
  | "tiff"
  | "webp"
  | "gif";
```

All the properties described in the `FormatOptions` interface are optional. The properties are defined as follows:

#### format

**Type:** `format | format[] | [] | null`

**Default:** `["avif", "webp"]`

The image format or formats to generate image sets for. If `format` is set to `null` or `[]`, no _additional_ image set will be generated.

> **Note:** Passing `[]` or `null` does not necessarily mean that no image sets will be generated. Image sets will still be generated for the source format if `includeSourceFormat` is set to `true` (which is the default value) and for the format specified in the `fallbackFormat` prop (the default value is the source format).

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  format={["webp", "jpg"]}
/>
```

#### fallbackFormat

**Type:** `format`

**Default:** _The source format of the image_

The format the browser will fallback to if the other formats are not supported.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  format={["webp", "jpg"]}
  fallbackFormat="png"
/>
```

#### includeSourceFormat

**Type:** `boolean`

**Default:** `true`

Whether to generate image set for the source format or not.

**Code example:**

```astro
<Image
  src="/src/images/image.tiff"
  alt="A random image"
  fallbackFormat="png"
  includeSourceFormat={false}
/>
```

#### formatOptions

**Type:** `Record<format, ImageToolsConfigs> & { tracedSVG?: PotraceOptions }`

**Default:** The default values for the all the formats except `tracedSVG` are inherited from the props of the `<Image />` component defined in the [`ImageToolsConfigs`](#imagetoolsconfigs) interface. And for more information on the `tracedSVG` property, see the [`PotraceOptions`](#potraceoptions) interface.

The configuration options for the different formats. The ten supported keys are `heic`, `heif`, `avif`, `jpg`, `jpeg`, `png`, `tiff`, `webp`, `gif` and `tracedSVG`. These configuration options will be respected when generating image sets for different formats. And the `tracedSVG` config options are used when the `placeholder` prop is set to `"tracedSVG"`.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  placeholder="tracedSVG"
  format={["webp", "jpg"]}
  fallbackFormat="png"
  includeSourceFormat={false}
  formatOptions={{
    jpg: {
      quality: 80,
    },
    png: {
      quality: 80,
    },
    webp: {
      quality: 50,
    },
    tracedSVG: {
      options: {
        background: "#fff",
        color: "#000",
        turnPolicy: "black",
        turdSize: 1,
        alphaMax: 1,
        optCurve: true,
        threshold: 100,
        blackOnWhite: false,
      },
    },
  }}
/>
```

### `ArtDirective`

The properties defined in the `ArtDirective` interface are used to define art directions for the provided image. It extends the [`PrimaryProps`](#primaryprops), [`FormatOptions`](#formatoptions) and [`ImageConfig`](#imageconfig) interfaces. The only property added is `media`. All the properties except `src` and `media` are optional.

#### media

**Type:** `string`

**Default:** `undefined`

The CSS media query to use.

**Code example:**

```astro
<Image
  src="/src/images/landscape.jpg"
  alt="alt text"
  artDirectives={[
    {
      media: "(max-aspect-ratio: 3/2)",
      // Properties defined in the PrimaryProps interface
      src: "/src/images/portrait.jpg",
      breakpoints: [256, 384, 512],
      // Properties defined in the ImageToolsConfigs interface
      width: 768,
      height: 1024,
      // Properties defined in the FormatOptions interface
      format: ["png"],
      includeSourceFormat: false,
    },
  ]}
/>
```

<!-- TODO: Investigate what the default values are of the properties defined in the ImageToolsConfigs interface -->

### `ImageToolsConfigs`

The properties defined in the `ImageToolsConfigs` interface are the directives
supported by the [`imagetools-core`](https://npmjs.com/package/imagetools-core) library. All the directives are documented in the [directives documentation](https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md) of the `imagetools-core` library. They are being documented here to reflect the changes made in the `astro-imagetools` package and for the different component syntax.

> **Note:** The values passed in the `background` and `tint` property will be parsed by the [`color-string`](https://www.npmjs.com/package/color-string) library so all color values known from css like rgb, rgba or named colors can be used.
>
> The `format` property is not defined in the `ImageToolsConfigs` interface because it works differently in the context of the `<Image />` component. Instead, it is defined in the [`FormatOptions`](#format) interface.
>
> The values passed in the `width`, `height` and `aspect` properties are used to resize the image when loading. The final image widths will be calculated from the [`breakpoints`](#breakpoints) property.
>
> The `imagetools-core` package supports `number[]` values for a few directives. But the `<Image />` component doesn't support them because they don't make sense in the context it.

#### flip

**Type:** `boolean`

**Default:** `undefined`

Flip the image about the vertical axis. This step is always performed **after** any rotation.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" flip />
```

#### flop

**Type:** `boolean`

**Default:** `undefined`

Flop the image about the horizontal axis. This step is always performed **after** any rotation.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" flop />
```

#### invert

**Type:** `boolean`

**Default:** `undefined`

Produces a **negative** of the image.

#### flatten

**Type:** `boolean`

**Default:** `undefined`

This directive will remove the alpha channel of the image, reducing filesize. Transparent pixels will be merged with the color set by [`background`](#background).

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" flatten />
```

#### normalize

**Type:** `boolean`

**Default:** `undefined`

**Normalizes** the image by stretching its luminance to cover the full dynamic range. This Enhances the output image contrast.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" normalize />
```

#### grayscale

**Type:** `boolean`

**Default:** `undefined`

Converts the image to an 8-bit grayscale image.

> **Note:** This directive will convert the image to the `b-w` colorspace, meaning the resulting image will only have one channel.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" normalize />
```

#### hue

**Type:** `number`

**Default:** `undefined`

Adjusts the images `hue` rotation by the given number of degrees. Commonly used together with [`saturation`](#saturation) and [`brightness`](#brightness).

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" hue={-30} />
```

#### saturation

**Type:** `number`

**Default:** `undefined`

Adjusts the images `saturation` with the given saturation multiplier. Commonly used together with [`hue`](#hue) and [`brightness`](#brightness).

**Code example:**

<!-- prettier-ignore -->
```astro
<Image 
  src="https://picsum.photos/200/300" 
  alt="A random image" 
  saturation={0.5}
/>
```

#### brightness

**Type:** `number`

**Default:** `undefined`

Adjusts the images `brightness` with the given brightness multiplier. Commonly used together with [`hue`](#hue) and [`saturation`](#saturation).

**Code example:**

<!-- prettier-ignore -->
```astro
<Image 
  src="https://picsum.photos/200/300" 
  alt="A random image" 
  brightness={0.5}
/>
```

#### `width` | `w`

**Type:** `number`

**Default:** The width of the image

Resizes the image to be the specified amount of pixels wide. If not given the height will be scaled accordingly.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" width={400} />
```

#### `height` | `h`

**Type:** `number`

**Default:** The height of the image

Resizes the image to be the specified amount of pixels tall. If not given the width will be scaled accordingly.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" height={400} />
```

#### `aspect` | `ar`

**Type:** `number`

**Default:** The aspect ratio of the image

Resizes the image to be the specified aspect ratio. If height and width are both provided, this will be ignored. If height is provided, the width will be scaled accordingly. If width is provided, the height will be scaled accordingly. If neither height nor width are provided, the image will be cropped to the given aspect ratio.

**Code example:**

<!-- prettier-ignore -->
```astro
<Image 
  src="https://picsum.photos/200/300"
  alt="A random image"
  aspect={3/2}
/>
```

#### background

**Type:** `string`

**Default:** `undefined`

This instructs various directives (e.g. the [`rotate`](#rotate)) to use the specified color when filling empty spots in the image.

> **Note:** This directive does nothing on it's own, it has to be used in conjunction with another directive. You also cannot set multiple values.

**Code example:**

```astro
---
const src = "https://picsum.photos/200/300";
const alt = "A random image";
---

<Image {src} {alt} flatten background="#FFFFFFAA" />

<Image {src} {alt} rotate={90} background="hsl(360, 100%, 50%)" />
```

#### tint

**Type:** `string`

**Default:** `undefined`

Tints the image using the provided chroma while preserving the image luminance. If the image has an alpha channel it will be untouched.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  tint="rgba(10,33,127)"
/>
```

#### blur

**Type:** `number | boolean`

**Default:** `undefined`

Blurs the image. When no argument is provided it performs a fast blur. When an argument between _0.3 and 1000_ is provided it performs a more accurate gaussian blur.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" blur /* A fast blur will be performed */ />

<Image src="https://picsum.photos/200/300" alt="A random image" blur={100} /* A gaussian blur will be performed */ />
```

#### median

**Type:** `number | boolean`

**Default:** `undefined`

Applies a median filter. This is commonly used to remove noise from images.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" median />

<Image src="https://picsum.photos/200/300" alt="A random image" median={50} />
```

#### rotate

**Type:** `number`

**Default:** `undefined`

Rotate the image by the specified number of degrees.

> **Note:** You can change the background color the empty parts are filled with by setting the [`background`](#background) directive.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" rotate={90} />
```

#### quality

**Type:** `number`

**Default:** `undefined`

All formats (except `gif`) allow the quality to be adjusted by setting this directive.

The argument must be a number between 0 and 100.

> See sharps [Output options](https://sharp.pixelplumbing.com/api-output) for default quality values.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" quality={50} />
```

#### fit

**Type:** `"cover" | "contain" | "fill" | "inside" | "outside"`

**Default:** `undefined`

When both `width` and `height` are provided, this directive can be used to specify the method by which the image should fit.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  width={100}
  height={100}
  fit="contain"
/>
```

#### kernel

**Type:** `"nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3"`

**Default:** `undefined`

Use this directive to set a different interpolation kernel when resizing the image.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  kernel="lanczos3"
/>
```

#### position

**Type:** `"top" | "right top" | "right" | "right bottom" | "bottom" | "left bottom" | "left" | "left top" | "north" | "northeast" | "east" | "southeast" | "south" | "southwest" | "west" | "northwest" | "center" | "centre" | "cover" | "entropy" | "attention"`

**Default:** `undefined`

When both `width` and `height` are provided AND `fit` is is set to `cover` or `contain`, this directive can be used to set the position of the image.

See sharps [resize options](https://sharp.pixelplumbing.com/api-resize#resize) for more information.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  width={100}
  height={100}
  fit="contain"
  position="attention"
/>
```

### `PotraceOptions`

The `PotraceOptions` interface defines the configuration options supported by the [`node-potrace`](https://npmjs.com/package/node-potrace) library. These options are used to generate traced SVGs when the `placeholder` prop is set to `"tracedSVG"`. All the properties defined in the `PotraceOptions` interface are optional.

> **Note:** Most of the below jargons are taken from the [`potrace`](https://npmjs.com/package/potrace) documentation. I have tried to simplify the config options and make the documentation as simple and clear as possible.
>
> If you want to go deeper into this, check the [Technical documentation](http://potrace.sourceforge.net/#technical) of the original [`potrace`](http://potrace.sourceforge.net/) C library.
>
> If you have a good knowledge of the `potrace` library and about bitmap tracing and posterizing, please consider contributing to update the documentation of this section.

#### function

**Type:** `"trace" | "posterize"`

**Default:** `"trace"`

Which method of the `node-potrace` library to use. The `posterize` method is basically _tracing_ the image multiple times to produce a more accurate result. See this [example](https://www.npmjs.com/package/potrace#example-and-demo) for more information.

#### options

##### turnPolicy

**Type:** `"black" | "white" | "left" | "right" | "minority" | "majority"`

**Default:** `"minority"`

How to resolve ambiguities in path decomposition. Refer to the [**potrace-algorithm**](http://potrace.sourceforge.net/potrace.pdf) documentaion (PDF, page 4) for more information.

##### turdSize

**Type:** `number`

**Default:** `2`

Suppress speckles of up to this size.

##### alphaMax

**Type:** `number`

**Default:** `1`

Corner threshold parameter.

##### optCurve

**Type:** `boolean`

**Default:** `true`

Curve optimization.

##### optTolerance

**Type:** `number`

**Default:** `0.2`

Curve optimization tolerance.

##### threshold

**Type:** `number`

**Default:** `-1`

_When `function` is "trace" :_

Threshold below which color is considered black. Should be a number between 0 and 255 or `-1` in which case threshold will be selected automatically using [Algorithm For Multilevel Thresholding](http://www.iis.sinica.edu.tw/page/jise/2001/200109_01.pdf).

_When `function` is "posterize" :_

Breaks image into foreground and background (and only foreground being broken into desired number of layers). Basically when provided it becomes a threshold for last (least opaque) layer and then `steps - 1` intermediate thresholds calculated. If **steps** is an array of thresholds and every value from the array is lower (or larger if **blackOnWhite** parameter set to `false`) than threshold - threshold will be added to the array, otherwise just ignored.

##### blackOnWhite

**Type:** `boolean`

**Default:** `true`

Specifies colors by which side from threshold should be turned into vector shape.

##### color

**Type:** `"auto" | string`

**Default:** `"auto"`

Fill color for the traced image. If `"auto"` is provided, the color will be black or white depending on the `blackOnWhite` property.

##### background

**Type:** `"transparent" | string`

**Default:** `"transparent"`

Background color of the traced image. If `"transparent"` is provided, no background will be present.

##### fill

**Type:** `"spread" | "dominant" | "median" | "mean"`

Determines how fill color for each layer should be selected.

- `dominant` - Most frequent color in range (used by default),
- `mean` - Arithmetic mean (average),
- `median` - Median color,
- `spread` - Ignores color information of the image and just spreads colors equally in range between 0 and `threshold` (or `threshold` and ..255 if `blackOnWhite` is set to `false`).

> **Note:** This option is present only when `function` is `"posterize"`.

##### ranges

**Type:** `"auto" | "equal"`

How color stops for each layer should be selected. Ignored if `steps` is an array. Possible values are:

- `auto` - Performs automatic thresholding (using [Algorithm For Multilevel Thresholding](http://www.iis.sinica.edu.tw/page/jise/2001/200109_01.pdf)). Preferable method for already posterized sources, but takes long time to calculate 5 or more thresholds (exponential time complexity) _(used by default)_
- `equal` - Ignores color information of the image and breaks available color space into equal chunks

> **Note:** This option is present only when `function` is `"posterize"`.

##### steps

**Type:** `number | number[]`

Specifies desired number of layers in resulting image. If a number provided - thresholds for each layer will be automatically calculated according to `ranges` property. If an array provided it expected to be an array with precomputed thresholds for each layer (in range between 0 and 255).

> **Note:** This option is present only when `function` is `"posterize"`.

**Code example:**

```astro
---
const src = "https://picsum.photos/200/300";
const alt = "A random image";
const placeholder = "tracedSVG";

const traceOptions = {
  background: "#fff",
  color: "#000",
  turnPolicy: "black",
  turdSize: 1,
  alphaMax: 1,
  optCurve: true,
  threshold: 100,
  blackOnWhite: false,
};

const posterizeOptions = {
  fill: "spread",
  steps: [0, 50, 100],
  ranges: "equal",
};
---

<Image
  {src}
  {alt}
  {placeholder}
  // tracing SVG
  formatOptions={{
    tracedSVG: {
      function: "trace",
      options: traceOptions,
    },
  }}
/>

<Image
  {src}
  {alt}
  {placeholder}
  // posterizing SVG
  formatOptions={{
    tracedSVG: {
      function: "posterize",
      options: {
        ...traceOptions,
        ...posterizeOptions,
      },
    },
  }}
/>
```

## Acknowledgements

### The people for whom this project became possible

[Jonathan Neal](https://github.com/jonathantneal) for being extremely helpful and for the [`@astropub/codecs`](https://github.com/astro-community/codecs) library.

[Jonas Kruckenberg](https://github.com/JonasKruckenberg) for the [`imagetools-core`](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/core) and the [`vite-imagetools`](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite) libraries.

[Lovell Fuller](https://github.com/lovell) for the awesome [`sharp`](https://sharp.pixelplumbing.com/) library.

[Matt Mc](https://github.com/tooolbox) for the [`potrace`](https://github.com/tooolbox/node-potrace) node library.

[Zade Viggers](https://github.com/zadeviggers) for his code contributions.

[Peter Singh](https://github.com/aFuzzyBear) for documentation support and suggestions.

_...and many more people for their help and inspiration. And, thanks to the [Astro JS](https://astro.build/) community for their support and encouragement. And, thanks to the people behind the [Vite JS](https://vitejs.dev/) project too._

### The articles that have helped me understand responsive images and image optimization

[Responsive Images 101](https://cloudfour.com/thinks/responsive-images-101-definitions/) by [Cloud Four](https://cloudfour.com/).

[Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) by [MDN](https://developer.mozilla.org/en-US/).

[A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/) by [CSS-Tricks](https://css-tricks.com/).

[Responsive Images](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images) by [Google Developers](https://developers.google.com/web/).

[Optimising for high-density displays](https://jakearchibald.com/2021/serving-sharp-images-to-high-density-screens/) by [Jake Archibald](https://jakearchibald.com/).

[Responsive Images, The sizes Attribute, and Unexpected Image Sizes](https://medium.com/@MRWwebDesign/responsive-images-the-sizes-attribute-and-unexpected-image-sizes-882a2eadb6db) by [Mark Root-Wiley](https://github.com/mrwweb/).

[Fluid Images: Art Direction](https://www.learnhowtoprogram.com/user-interfaces/responsive-design-development-environments/fluid-images-art-direction) by [Learn How To Program](https://www.learnhowtoprogram.com/).

[Responsive images and art direction](https://web.dev/patterns/web-vitals-patterns/images/responsive-images/) by [Web.dev](https://web.dev/).

_...and many more articles and resources that have helped me to understand responsive images and image optimization._
