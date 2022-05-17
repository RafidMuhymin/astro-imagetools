// @ts-check
import getSrcset from "./getSrcset.js";
import getConfigOptions from "./getConfigOptions.js";
import getFallbackImage from "./getFallbackImage.js";
import getProcessedImage from "./getProcessedImage.js";

export default async function getArtDirectedImages(
  artDirectives = [],
  placeholder,
  format,
  imagesizes,
  breakpoints,
  fallbackFormat,
  includeSourceFormat,
  formatOptions,
  rest
) {
  const images = await Promise.all(
    artDirectives.map(
      async ({
        src,
        media,
        sizes: directiveImagesizes,
        placeholder: directivePlaceholder,
        breakpoints: directiveBreakpoints,
        objectFit,
        objectPosition,
        backgroundSize,
        backgroundPosition,
        format: directiveFormat,
        fallbackFormat: directiveFallbackFormat,
        includeSourceFormat: directiveIncludeSourceFormat,
        formatOptions: directiveFormatOptions = {},
        ...configOptions
      }) => {
        const {
          path,
          rest: rest2,
          image,
          imageWidth,
          imageHeight,
          imageFormat,
        } = await getProcessedImage(src, configOptions);

        rest2.aspect = `${imageWidth / imageHeight}`;

        const calculatedConfigs = getConfigOptions(
          imageWidth,
          directiveImagesizes || imagesizes,
          directiveBreakpoints || breakpoints,
          directiveFormat || format,
          imageFormat,
          directiveFallbackFormat || fallbackFormat,
          directiveIncludeSourceFormat || includeSourceFormat
        );

        const { formats, requiredBreakpoints } = calculatedConfigs;

        imagesizes = calculatedConfigs.imagesizes;

        const maxWidth = requiredBreakpoints[requiredBreakpoints.length - 1];

        const sources = await Promise.all(
          formats.map(async (format) => {
            const srcset = await getSrcset(path, requiredBreakpoints, format, {
              ...rest,
              ...rest2,
              ...formatOptions[format],
              ...directiveFormatOptions[format],
            });

            return {
              format,
              srcset,
            };
          })
        );

        const sizes = {
          width: maxWidth,
          height: Math.round(maxWidth / rest2.aspect),
        };

        const object = {
          fit: objectFit,
          position: objectPosition,
        };

        const background = {
          size: backgroundSize,
          position: backgroundPosition,
        };

        const fallback = await getFallbackImage(
          path,
          directivePlaceholder || placeholder,
          image,
          imageFormat,
          { ...formatOptions, ...directiveFormatOptions },
          { ...rest, ...rest2 }
        );

        const returnValue = {
          media,
          sources,
          sizes,
          fallback,
          imagesizes,
        };

        const isBackgroundImage = !!backgroundSize || !!backgroundPosition;

        isBackgroundImage
          ? (returnValue.background = background)
          : (returnValue.object = object);

        return {
          media,
          sources,
          sizes,
          object,
          fallback,
          imagesizes,
        };
      }
    )
  );

  return images;
}
