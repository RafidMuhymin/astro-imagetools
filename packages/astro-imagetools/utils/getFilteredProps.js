// @ts-check
import filterConfigs from "./filterConfigs.js";
import { supportedConfigs, GlobalConfigOptions } from "../runtimeChecks.js";

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

  const { search, searchParams } = new URL(props.src, "file://");

  props.src = props.src.replace(search, "");

  const paramOptions = Object.fromEntries(searchParams);

  const filteredLocalProps = filterConfigs(
    type,
    {
      ...paramOptions,
      ...props,
    },
    SupportedProperties[type]
  );

  const resolvedProps = {
    ...filteredLocalProps,
    ...filteredGlobalConfigs,
  };

  const {
    src,
    alt,
    tag = "section",
    content = "",
    sizes = function (breakpoints) {
      const maxWidth = breakpoints.at(-1);
      return `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`;
    },
    preload,
    loading = preload ? "eager" : "lazy",
    decoding = "async",
    attributes = {},
    layout = "constrained",
    placeholder = "blurred",
    breakpoints,
    objectFit = "cover",
    objectPosition = "50% 50%",
    backgroundSize = "cover",
    backgroundPosition = "50% 50%",
    format = type === "Img" ? undefined : ["avif", "webp"],
    fallbackFormat,
    includeSourceFormat = true,
    formatOptions = {
      tracedSVG: {
        function: "trace",
      },
    },
    fadeInTransition = true,
    artDirectives,
    ...transformConfigs
  } = resolvedProps;

  // prettier-ignore
  const allProps = {
    src, alt, tag, content, sizes, preload, loading, decoding, attributes, layout, placeholder,
    breakpoints, objectFit, objectPosition, backgroundSize, backgroundPosition, format,
    fallbackFormat, includeSourceFormat, formatOptions, fadeInTransition, artDirectives,
    ...transformConfigs,
  };

  const filteredProps = filterConfigs(
    type,
    allProps,
    SupportedProperties[type],
    { warn: false }
  );

  return {
    filteredProps,
    transformConfigs,
  };
}
