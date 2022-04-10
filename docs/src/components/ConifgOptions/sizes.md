### `sizes`

**Type:** `string` or `(breakpoints: number[]) => string`

**Default:** `` (breakpoints) => `(min-width: ${breakpoints.at(-1)}px) ${breakpoints.at(-1)}px, 100vw ``

A string or function that returns a string suitable for the value of the `sizes` attribute of the generated `<img />` element. The final calculated breakpoints are passed to the function as a parameter.

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
