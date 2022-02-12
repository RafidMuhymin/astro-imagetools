# Astro Image

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

To use the component, first register the plugin in your `astro.config.js` file:

```js
import astroImagePlugin from "astro-imagetools/plugin";

export default {
  vite: {
    plugins: [astroImagePlugin],
  },
};
```

Now, there's another thing you'll have to do to be able to use the component. You'll have exclude a few dependencies from _being prebuilt_ and _SSR_ by adding them to `vite.optimizeDeps.exclude` and `ssr.external` in the `astro.config.js` file as shown below:

```js
import astroImagePlugin from "astro-imagetools/plugin";

export default {
  vite: {
    plugins: [astroImagePlugin],
    optimizeDeps: {
      exclude: ["@astropub/codecs", "imagetools-core", "sharp"],
    },
    ssr: {
      external: ["sharp", "potrace"],
    },
  },
};
```

Then, you'll be able to use the component inside your Astro components like below:

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

## Documentation

Docs coming soon!

### Component Props

The below interface describes the props that the component accepts. The props are passed to the component as a JSX attribute.

**Note:** The `<Image />` component and the plugin fallback to `@astropub/codecs` for processing images if the environment is unable to install `sharp`. Most of the properties defined in the `ImagetoolsConfig` interface won't be available in this case.

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

declare type PotraceOptions = TraceOptions | PosterizeOptions;

declare interface FormatOptions {
  format?: format | format[] | [] | null;
  fallbackFormat?: boolean;
  includeSourceFormat?: boolean;
  formatOptions?: {
    [key in format]?: ImageToolsConfigs;
  } & {
    tracedSVG?: PotraceOptions;
  };
}

declare interface ArtDirectives extends FormatOptions, ImageToolsConfigs {
  src: string;
  media: string;
  breakpoints?: number | number[];
  placeholder?: "dominantColor" | "blurred" | "tracedSVG" | "none";
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  objectPosition?: string;
}

declare interface ComponentProps {
  src: string;
  alt: string;
  preload?: boolean | format;
  loading?: "lazy" | "eager" | "auto" | null;
  decoding?: "async" | "sync" | "auto" | null;
  breakpoints?:
    | number[]
    | {
        count?: number;
        minWidth?: number;
        maxWidth?: number;
      };
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  objectPosition?: string;
  layout?: "constrained" | "fixed" | "fullWidth" | "fill";
  placeholder?: "dominantColor" | "blurred" | "tracedSVG" | "none";
  artDirectives?: ArtDirectives[];
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

declare type ImageConfig = ComponentProps & FormatOptions & ImageToolsConfigs;

export default ImageConfig;
```

### Plugin Options

The plugin is still in beta and doesn't yet support any configuration options.

## Contributing

If you have any suggestions, please open an issue on [GitHub](https://github.com/RafidMuhymin/astro-imagetools).
