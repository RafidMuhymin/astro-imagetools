---
setup: |
  import { Markdown } from "astro/components"
---

### `objectPosition`

**Type:** `string`

**Default:** `50% 50%`

The value of the `object-position` CSS property of the generated `<img />` element.

**Code example:**

```astro
<Image
  src="https://picsum.photos/200/300"
  alt="A random image"
  objectPosition="top left"
/>
```
