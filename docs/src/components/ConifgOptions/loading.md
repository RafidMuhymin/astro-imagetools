### `loading`

**Type:** `"lazy" | "eager" | "auto" | null`

**Default:** `preload ? "eager" : "lazy"`

The value of the `loading` attribute of the generated `<img />` element. If `null` is provided, the `loading` attribute will be omitted.

**Code example:**

```astro
<Image src="https://picsum.photos/200/300" alt="A random image" loading="eager"
/>
```
