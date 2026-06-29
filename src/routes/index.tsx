import { TILE_SIZE } from '#/components/canvas/conf.ts'
import { KBoard } from '#/components/canvas/k-board.tsx'
import { createFileRoute } from '@tanstack/react-router'
import { Stage } from 'react-konva'

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
        className="border-2 border-black/50 rounded-2xl overflow-clip shadow-2xl"
      >
        <KBoard />
      </Stage>
    </div>
  )
}
