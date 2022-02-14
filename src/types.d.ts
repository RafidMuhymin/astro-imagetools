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

export declare type ImageConfig = ComponentProps &
  FormatOptions &
  ImageToolsConfigs;

export interface ImageHTMLData {
  image: string;
  link: string;
  style: string;
}

export function renderImage(props: ImageConfig): Promise<ImageHTMLData>;
