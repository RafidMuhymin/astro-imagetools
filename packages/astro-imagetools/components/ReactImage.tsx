/** @jsxImportSource react */

import type { ImageConfig } from "../types";
import renderImage from "./utils/renderImage";
import makeSynchronous from "make-synchronous";

const syncRenderImage = makeSynchronous(renderImage);

// const renderedImage = syncRenderImage({
//   src: "/src/images/elva-800w.jpg",
//   alt: "A father holiding his beloved daughter in his arms",
// });

// console.log(renderedImage);

export default function ReactImage(props: ImageConfig) {
  return <h1>Hello World!</h1>;
}
