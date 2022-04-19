// @ts-check
import {
  supportedConfigs,
  GlobalConfigOptions,
  ImageToolsDirectives,
} from "../runtimeChecks.js";
import filterConfigs from "./filterConfigs.js";

const NonProperties = {
  Img: [
    "tag",
    "content",
    "backgroundSize",
    "backgroundPosition",
    "fallbackFormat",
    "includeSourceFormat",
    "fadeInTransition",
    "artDirectives",
  ],
  Picture: ["tag", "content", "backgroundSize", "backgroundPosition"],
  BackgroundImage: [
    "alt",
    "loading",
    "decoding",
    "layout",
    "objectFit",
    "objectPosition",
    "fadeInTransition",
  ],
  BackgroundPicture: ["alt", "backgroundSize", "backgroundPosition"],
};

const ImgProperties = supportedConfigs.filter(
    (key) => !NonProperties.Img.includes(key)
  ),
  PictureProperties = supportedConfigs.filter(
    (key) => !NonProperties.Picture.includes(key)
  ),
  BackgroundImageProperties = supportedConfigs.filter(
    (key) => !NonProperties.BackgroundImage.includes(key)
  ),
  BackgroundPictureProperties = supportedConfigs.filter(
    (key) => !NonProperties.BackgroundPicture.includes(key)
  );

const SupportedProperties = {
  Img: ImgProperties,
  Picture: PictureProperties,
  BackgroundImage: BackgroundImageProperties,
  BackgroundPicture: BackgroundPictureProperties,
};

export default function getFilteredProps(type, props) {
  const filteredGlobalConfigs = filterConfigs(
    "Global",
    GlobalConfigOptions,
    SupportedProperties[type],
    { warn: false }
  );

  let filteredProps = filterConfigs(type, props, SupportedProperties[type]);

  const {
    src,
    alt,
    tag = filteredGlobalConfigs.section || "section",
    content = "",
    sizes = filteredGlobalConfigs.sizes ||
      function (breakpoints) {
        const maxWidth = breakpoints.at(-1);
        return `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`;
      },
    preload = filteredGlobalConfigs.preload,
    loading = filteredGlobalConfigs.loading || preload ? "eager" : "lazy",
    decoding = filteredGlobalConfigs.decoding || "async",
    layout = filteredGlobalConfigs.layout || "constrained",
    placeholder = filteredGlobalConfigs.placeholder || "blurred",
    breakpoints = filteredGlobalConfigs.breakpoints,
    objectFit = filteredGlobalConfigs.objectFit || "cover",
    objectPosition = filteredGlobalConfigs.objectPosition || "50% 50%",
    backgroundSize = filteredGlobalConfigs.backgroundSize || "cover",
    backgroundPosition = filteredGlobalConfigs.backgroundPosition || "50% 50%",
    format = filteredGlobalConfigs.format ||
      (type === "Picture" ? ["avif", "webp"] : undefined),
    fallbackFormat = filteredGlobalConfigs.fallbackFormat,
    includeSourceFormat = filteredGlobalConfigs.includeSourceFormat || true,
    formatOptions = filteredGlobalConfigs.formatOptions || {
      tracedSVG: {
        function: "trace",
      },
    },
    fadeInTransition = filteredGlobalConfigs.fadeInTransition || true,
    artDirectives = filteredGlobalConfigs.artDirectives,
    ...transformConfigs
  } = props;

  const globalTransformConfigs = filterConfigs(
    "Global",
    filteredGlobalConfigs,
    ImageToolsDirectives
  );

  // prettier-ignore
  const resolvedProps = {
    src, alt, tag, content, sizes, preload, loading, decoding, layout, placeholder, breakpoints, objectFit, objectPosition, backgroundSize, backgroundPosition, format, fallbackFormat, includeSourceFormat, formatOptions, fadeInTransition, artDirectives,
    ...globalTransformConfigs, ...transformConfigs,
  };

  filteredProps = filterConfigs(
    type,
    resolvedProps,
    SupportedProperties[type],
    { warn: false }
  );

  return {
    filteredProps,
    transformConfigs,
  };
}
