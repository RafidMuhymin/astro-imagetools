### `layout`

**Type:** `"constrained" | "fixed" | "fullWidth" | "fill"`

**Default:** `"constrained"`

The layout mode to determine the resizing behavior of the image in the browser.

In `constrained` mode, the image will occupy full width of the container with `max-width` set to 100% its width. The height of the image will be calculated based on the aspect ratio of the image. The image will be scaled down to fit the container but won't be enlarged.

In `fixed` mode, the image will have a fixed width and height. The `width` and `height` props will be used to set the width and height of the image. The image won't be scaled down nor enlarged.

In `fullWidth` mode, the image will be scaled up or down to occupy the full width of the container. The height of the image will be calculated based on the aspect ratio of the image.

In `fill` mode, the image will be scaled up or down to fill the entire width and height of the container.

**Code example:**

<!-- prettier-ignore -->
```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  layout="fixed"
/>
```
