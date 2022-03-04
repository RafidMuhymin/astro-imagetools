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
  fallbackFormat?: format;
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

declare interface ArtDirectives
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

declare type breakpointsFunction = {
  (imageWidth: number): number[];
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
    | breakpointsFunction
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
  artDirectives?: Array<
    { media: string } & FormatOptions & FormatOptions & ImageToolsConfigs
  >;
  // Check the ArtDirectives interface for more details.
}

export interface ImageHTMLData {
  link: string;
  style: string;
  image: string;
}

export function renderImage(props: ImageConfig): Promise<ImageHTMLData>;
