import { TILE_SIZE } from '#/components/canvas/conf.ts'
import { KBoard } from '#/components/canvas/k-board.tsx'
import { createFileRoute } from '@tanstack/react-router'
import Konva from 'konva'
import { Stage } from 'react-konva'

Konva.pixelRatio = 3 // increase the dpi

export const Route = createFileRoute('/')({
  component: Home,
  pendingComponent: () => null,
})
function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Stage
        height={TILE_SIZE * 8}
        width={TILE_SIZE * 8}
        className="shadow-[0_0_10px_10px_#0000001a]"
      >
        <KBoard />
      </Stage>
    </div>
  )
}
