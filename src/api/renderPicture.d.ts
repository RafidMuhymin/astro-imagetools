type ImageConfig = import("../types").ImageConfig;
type ImageHTMLData = import("../types").ImageHTMLData;

export default function renderPicture(
  config: ImageConfig
): Promise<ImageHTMLData>;
