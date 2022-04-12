import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

declare interface Header {
  depth: number;
  slug: string;
  text: string;
}

const TableOfContents: FunctionalComponent<{ headers: Header[] }> = ({
  headers = [],
}) => {
  const [renderedHeaders, setRenderedHeaders] = useState<Header[]>(undefined);

  useEffect(() => {
    const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");

    const newRenderedHeaders = [...titles]
      .map((title) => {
        const depth = parseInt(title.tagName.substring(1));
        const slug = title.id;
        const text = title.textContent;
        return { depth, slug, text };
      })
      .filter(({ slug }) => slug !== "");

    setRenderedHeaders(newRenderedHeaders);
  }, []);

  return (
    <>
      <h2 class="heading">On this page</h2>

      <ul>
        <li class="header-link depth-2">
          <a href="#overview">Overview</a>
        </li>

        {(renderedHeaders || headers)
          .filter(({ depth }) => depth > 1 && depth < 4)
          .map(({ depth, slug, text }) => (
            <li class={`header-link depth-${depth}`}>
              <a href={`#${slug}`}>{text}</a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TableOfContents;
