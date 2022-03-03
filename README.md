# Astro ImageTools

`astro-imagetools` comes with the set of tools to perform image optimization and handle responsive images generation for the **Astro JS** framework.

## Installation

To install the package, run the following command:

```bash
npm install astro-imagetools

# yarn
yarn add astro-imagetools

# pnpm
pnpm add astro-imagetools
```

The `astro-imagetools` package comes with an `<Image />` component and a _Vite_ plugin. The component depends on the plugin to be able to optimize and generate responsive images.

It also exports the `renderImage` function used by the component interally to allow the user to programmatically generate image sets.

To use the component, first register the plugin in your `astro.config.js` file:

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
          media: "(max-aspect-ratio: 3/2)",
          src: "/src/images/portrait.jpg",
        },
      ]}
    />
  </body>
</html>
```

If you want to generate optimize image sets programmatically, you can use the `renderImage` function as shown below:

```js
import renderImage from "astro-imagetools/renderImage";

export async function getRenderedImage({ src, alt, ...rest }) {
  const { link, style, image } = await renderImage({ src, alt, ...rest });

  return link + style + image;
}
```

The `renderImage` function takes the same arguments as the props of the `<Image />` component. The function returns a promise that resolves to an `ImageHTMLData` object which contains the following properties:

```ts
export interface ImageHTMLData {
  link: string;
  style: string;
  image: string;
}
```

## Configuration Options

Both the `<Image />` component and the `renderImage` function supports a total of 40 config options. You can pass them directly to the component as props and to the function as propertise of an object.

### Example Usage

#### `<Image />` Component

```jsx
<Image src="/src/images/landscape.jpg" alt="alt text" />
```

#### `renderImage` Function

```js
const { link, style, image } = await renderImage({
  src: "/src/images/landscape.jpg",
  alt: "alt text",
});
```

### Interface

The `ImageConfig` interface below describes the props that the component and the `renderImage` function accepts. The props are passed to the component as a JSX attribute.

This section is only for quick reference and for astronomers familiar with _TypeScript_. If you are not comfortable with `TypeScript` or need more information, you can skip this section and move on to the next section for a more detailed explanation with examples.

**Note:** The `<Image />` component and the plugin fallback to `@astropub/codecs` for processing images if the environment is unable to install `sharp`. Most of the properties defined in the `ImagetoolsConfig` interface won't be available in this case.

```ts
// The formats supported by the `<Image />` component and the plugin.
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

// Check https://github.com/tooolbox/node-potrace for more info on the properties of the PotraceOptions interface.
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
  // The image format or formats to generate image sets for. If `format` is set to `null` or `[]`, no image will be generated.

  // **Note:** Passing `[]` or `null` does not necessarily mean that no image will be generated. If `includeSourceFormat` is set to `true`, then the source format and the format specified in the `fallbackFormat` prop will still be generated.
  fallbackFormat?: boolean;
  // The format the browser will fallback to if the other formats are not supported by it. If not provided, the format of the source image will be used.
  includeSourceFormat?: boolean;
  // Whether to generate image set for the source format or not.
  formatOptions?: Record<format, ImageToolsConfigs> & {
    tracedSVG?: PotraceOptions;
    // Check the format type and ImageToolsConfigs & PotraceOptions interfaces for the supported properties
  };
}

// Check https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md for more info on the properties of the ImageToolsConfigs interface.
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
  ar?: number | string;
  width?: number;
  height?: number;
  aspect?: number | string;
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
  // The media query for the intended media of the image.

  // Check the PrimaryProps, FormatOptions and ImageToolsConfigs interface for the other supported options.
}

declare type sizesFunction = {
  (breakpoints: number[]): string;
};

declare interface PrimaryProps {
  src: string;
  // The absolute path to the source image.
  sizes?: string | sizesFunction;
  // A string or function that returns a string suitable for the value of the `sizes` attribute of the `<img />` element. The final calculated breakpoints are passed to the function as a parameter.
  objectPosition?: string;
  // The value of the `object-position` CSS property of the `<img />` element.
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  // The value of the `object-fit` CSS property of the `<img />` element.
  placeholder?: "dominantColor" | "blurred" | "tracedSVG" | "none";
  // The placeholder to be displayed while the image is loading. If `placeholder` is set to `"dominantColor"`, the dominant color of the image will be used as the placeholder. If it is set to `"blurred"`, a very low-resolution version of the provided image will be enlarged and used as the placeholder. If it is set to `"tracedSVG"`, a traced SVG of the image will be used as the placeholder. If it is set to `"none"`, no placeholder will be displayed.
  breakpoints?:
    | number[]
    | {
        count?: number;
        minWidth?: number;
        maxWidth?: number;
      };
  // An array of widths in pixels to generate image sets for. If not provided, the breakpoints will be calculated automatically based on the width of the provided image.

  // If an object is passed then the breakpoints will be calculated based on them. The `count` property is to specify the number of breakpoints to generate. The `minWidth` and `maxWidth` properties are to specify the widths to generate in the range between the two values.
}

export interface ImageConfig
  extends PrimaryProps,
    FormatOptions,
    ImageToolsConfigs {
  alt: string;
  // The value of the `alt` attribute of the `<img />` element.
  preload?: boolean | format;
  // Whether to preload the image or not or what format of image to preload.
  loading?: "lazy" | "eager" | "auto" | null;
  // The value of the `loading` attribute of the `<img />` element.
  decoding?: "async" | "sync" | "auto" | null;
  // The value of the `decoding` attribute of the `<img />` element.
  layout?: "constrained" | "fixed" | "fullWidth" | "fill";
  // The layout mode of the image.

  // In `constrained` mode, the image will occupy full width of the container with `max-width` set to its width. The height of the image will be calculated based on the aspect ratio of the image. The image will be scaled down to fit the container but won't be enlarged.

  // In `fixed` mode, the image will have a fixed width and height. The `width` and `height` props will be used to set the width and height of the image. The image won't be scaled down nor enlarged.

  // In `fullWidth` mode, the image will be scaled up or down to occupy the full width of the container. The height of the image will be calculated based on the aspect ratio of the image.

  // In `fill` mode, the image will be scaled up or down to fill the entire width and height of the container.
  artDirectives?: ArtDirective[];
  // Check the ArtDirective interface for more details.
}
```

### `PrimaryProps`

The properties described in the `PrimaryProps` interface are some of the main props and they are shared with the `ArtDirectives` too. All the props of the `PrimaryProps` interface are optional except for the `src` and `alt` properties.

#### src

**Type:** `string`

**Default:** `undefined`

The absolute path to the source image.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" />
```

#### alt

**Type:** `string`

**Default:** `undefined`

The value of the `alt` attribute of the `<img />` element.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" />
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

An array of widths in pixels to generate image sets for. If not provided, the breakpoints will be calculated automatically based on the width of the provided image.

If an object is passed then the breakpoints will be calculated based on `count`, `minWidth`, and `maxWidth` properties. The `count` property is to specify the number of breakpoints to generate. The `minWidth` and `maxWidth` properties are to specify the widths to generate in the range between their values.

When an object is passed or the `breakpoints` prop is not provided, the breakpoints are calculated using a simple formula or algorithm. Instead of explaining the complete algorithm here, I am linking to the [source code](https://github.com/RafidMuhymin/astro-imagetools/blob/main/src/component/utils/getBreakpoints.js) of it.

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
/>
```

### `ImageToolsConfigs`

The properties described in the `ImageToolsConfigs` interface are the directives
supported by the `imagetools-core` package. All the properties behave the same way
as described in the [directives documentation](https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md)
of the `imagetools-core` package.

<!-- TODO: add the directives documentation -->
