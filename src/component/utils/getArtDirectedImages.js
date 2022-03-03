// @ts-check

import getConfigOptions from "./getConfigOptions.js";
import getFallbackImage from "./getFallbackImage.js";
import getProcessedImage from "./getProcessedImage.js";
import getSrcset from "./getSrcset.js";

export default async function getArtDirectedImages(
  artDirectives = [],
  placeholder,
  format,
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
        sizes: imagesizes,
        placeholder: directivePlaceholder,
        breakpoints: directiveBreakpoints,
        objectFit,
        objectPosition,
        format: directiveFormat,
        fallbackFormat: directiveFallbackFormat,
        includeSourceFormat: directiveIncludeSourceFormat,
        formatOptions: directiveFormatOptions = {},
        ...configOptions
      }) => {
        const {
          rest: rest2,
          image,
          imageWidth,
          imageHeight,
          imageFormat,
        } = await getProcessedImage(src, configOptions);

        rest2.aspect = `${imageWidth / imageHeight}`;

        const calculatedConfigs = getConfigOptions(
          imageWidth,
          imagesizes,
          directiveBreakpoints || breakpoints,
          directiveFormat || format,
          imageFormat,
          directiveFallbackFormat || fallbackFormat,
          directiveIncludeSourceFormat || includeSourceFormat
        );

        const { formats, requiredBreakpoints } = calculatedConfigs;

        imagesizes = calculatedConfigs.imagesizes;

        const maxWidth = requiredBreakpoints.at(-1);

        const sources = await Promise.all(
          formats.map(async (format) => {
            const srcset = await getSrcset(src, requiredBreakpoints, format, {
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

        const fallback = await getFallbackImage(
          src,
          directivePlaceholder || placeholder,
          image,
          imageFormat,
          { ...formatOptions, ...directiveFormatOptions },
          { ...rest, ...rest2 }
        );

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
