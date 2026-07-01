import type { FC } from 'react'
import { HistorySection } from './history-section'

export const RightPanel: FC = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full bg-black p-0.5 gap-0.5  max-h-[calc(100svh-40px)] [&>div]:bg-background">
      <div className="row-span-full overflow-auto h-full p-1">
        <HistorySection />
      </div>
      <div className="size-full p-1">Black</div>
      <div className="size-full p-1">White</div>
    </div>
  )
}
