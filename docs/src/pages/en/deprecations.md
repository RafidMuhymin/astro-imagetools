---
title: Deprecations & Migration Guide
description: Astro ImageTools Deprecations & Migration Guide
layout: ../../layouts/MainLayout.astro
---

The `<Image />` component and the `renderImage` API have been deprecated in favor of the new `<Img />` and `<Picture />` components and the `renderImg` and `renderPicture` APIs.

Currently, the `<Image />` component and the `renderImage` API are still available in the `astro-imagetools` package for backward-compatibility. They are aliased to the `<Picture />` component and the `renderPicture` API respectively.

They will be removed in the upcoming minor releases of **Astro ImageTools**. So, please migrate to the new `<Img />` and `<Picture />` components and the `renderImg` and `renderPicture` APIs as soon as possible.

> **Note:** According to the [Semantic Versioning](https://semver.org/) standard, any minor release before `v1.0.0` is considered _breaking_.
