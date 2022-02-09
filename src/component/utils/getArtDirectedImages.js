// @ts-check

import getConfigOptions from "./getConfigOptions";
import getFallbackImage from "./getFallbackImage";
import stringifyParams from "./stringifyParams";
import getProcessedImage from "./getProcessedImage";

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
          path,
          rest: rest2,
          image,
          imageWidth,
          imageHeight,
          imageFormat,
        } = await getProcessedImage(src, configOptions);

        // @ts-ignore
        rest2.aspect = `${imageWidth / imageHeight}`;

        const { formats, requiredBreakpoints } = getConfigOptions(
          imageWidth,
          directiveBreakpoints || breakpoints,
          directiveFormat || format,
          imageFormat,
          directiveFallbackFormat || fallbackFormat,
          directiveIncludeSourceFormat || includeSourceFormat
        );

        const maxWidth = requiredBreakpoints.at(-1);

        const sources = await Promise.all(
          formats.map(async (format) => {
            const params = stringifyParams({
              ...rest,
              ...rest2,
              ...formatOptions[format],
              ...directiveFormatOptions[format],
            });

            const { default: srcset } = await import(
              `${path}?srcset&w=${requiredBreakpoints.join(
                ";"
              )}&format=${format}${params}`
            );

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
        };
      }
    )
  );

  return images;
}
