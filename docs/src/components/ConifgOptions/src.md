### `src`

**Type:** `string`

**Default:** `undefined`

The absolute path to the source image stored in the file system or the URL of the image. Data URIs are also supported. The `src` property is required.

**Code example:**

```astro
<!-- Local image -->
<Image src="/src/images/image.jpg" alt="A local image" />

<!-- Remote image -->
<Image src="https://example.com/image.jpg" alt="A remote image" />

<!-- Data URI -->
<Image
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  alt="A base64 encoded image"
/>
```

