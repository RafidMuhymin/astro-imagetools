### `decoding`

**Type:** `"async" | "sync" | "auto" | null`

**Default:** `"async"`

The value of the `decoding` attribute of the generated `<img />` element. If `null` is provided, the `decoding` attribute will be omitted.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" decoding="sync"
/>
```
