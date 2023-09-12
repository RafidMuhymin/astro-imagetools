import {
  ImgConfigOptions,
  PictureConfigOptions,
  BackgroundImageConfigOptions,
  BackgroundPictureConfigOptions,
} from "../types"

export const Img: (props: ImgConfigOptions) => string
export const Picture: (props: PictureConfigOptions) => string
export const BackgroundImage: (props: BackgroundImageConfigOptions) => string
export const BackgroundPicture: (props: BackgroundPictureConfigOptions) => string
