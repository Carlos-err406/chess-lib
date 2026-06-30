import type Konva from 'konva'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { Group, Image as ImageComponent } from 'react-konva'
import useImage from 'use-image'

export const URLImage = forwardRef<
  Konva.Image,
  { src: string } & Omit<ComponentProps<typeof ImageComponent>, 'image'>
>(({ src, ...rest }, ref) => {
  const [image] = useImage(src, 'anonymous')
  return (
    <Group>
      <ImageComponent ref={ref} image={image} {...rest} />
    </Group>
  )
})
