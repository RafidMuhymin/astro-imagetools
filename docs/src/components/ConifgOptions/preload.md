### `preload`

**Type:** `"heic" | "heif" | "avif" | "jpg" | "jpeg" | "png" | "tiff" | "webp" | "gif"`

**Default:** `webp`

Which format of image to preload.

> **Note:** It's not reasonable to preload multiple formats of the same image. And due to the factors like file size and browser support, it's not possible to pick the best format automatically.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" preload="webp"
/>
```
