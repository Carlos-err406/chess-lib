import type Konva from 'konva'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { Image as ImageComponent } from 'react-konva'
import useImage from 'use-image'

export const URLImage = forwardRef<
  Konva.Image,
  { src: string } & Omit<ComponentProps<typeof ImageComponent>, 'image'>
>(({ src, ...rest }, ref) => {
  const [image] = useImage(src, 'anonymous')
  return <ImageComponent ref={ref} image={image} {...rest} />
})
