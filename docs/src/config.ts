export const SITE = {
  title: "Astro ImageTools Documentation",
  description: "Documentation for the Astro ImageTools project",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "astrodotbuild",
};

export const KNOWN_LANGUAGES = {
  English: "en",
};

export const GITHUB_EDIT_URL = `https://github.com/withastro/astro-imagetools/blob/main/docs/`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
  en: [
    { text: "", header: true },
    { text: "Getting Started", header: true },
    { text: "Introduction", link: "en/introduction" },
    { text: "Installation", link: "en/installation" },
    { text: "Usage", link: "en/usage" },
    { text: "Components and APIs", link: "en/components-and-apis" },
    { text: "Markdown Images", link: "en/markdown-images" },

    { text: "Components", header: true },
    { text: "<Img />", link: "en/components/Img" },
    { text: "<Picture />", link: "en/components/Picture" },
    { text: "<BackgroundImage />", link: "en/components/BackgroundImage" },
    { text: "<BackgroundPicture />", link: "en/components/BackgroundPicture" },

    { text: "API", header: true },
    { text: "renderImg", link: "en/api/renderImg" },
    { text: "renderPicture", link: "en/api/renderPicture" },
    { text: "renderBackgroundImage", link: "en/api/renderBackgroundImage" },
    { text: "renderBackgroundPicture", link: "en/api/renderBackgroundPicture" },

    { text: "Miscellaneous", header: true },
    { text: "Deprecations", link: "en/deprecations" },
    { text: "Acknowledgements", link: "en/acknowledgements" },
  ],
};
