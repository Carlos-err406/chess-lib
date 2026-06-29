import type { ComponentProps, FC } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

export const URLImage: FC<
  { src: string } & Omit<ComponentProps<typeof Image>, 'image'>
> = ({ src, ...rest }) => {
  const [image] = useImage(src, 'anonymous')
  return <Image image={image} {...rest} />
}
