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
  fadeInTransition: boolean | number | KeyframeEffectOptions;
  artDirectives?: ArtDirective[];
}

export interface ImageHTMLData {
  link: string;
  style: string;
  image: string;
}

export function renderImage(props: ImageConfig): Promise<ImageHTMLData>;
