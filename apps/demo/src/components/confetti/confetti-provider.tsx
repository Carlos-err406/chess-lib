import confetti from 'canvas-confetti'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext, useRef } from 'react'
import { PAWN_SHAPE } from './shapes'

const ConfettiContext = createContext<null | confetti.CreateTypes>(null)

export const ConfettiProvider: FC<PropsWithChildren> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const confettiCreator = confetti.create(canvasRef.current ?? undefined, {
    resize: true,
    useWorker: true,
  })

  return (
    <ConfettiContext.Provider value={confettiCreator}>
      {children}
      <canvas ref={canvasRef} style={{ height: 0, width: 0 }}></canvas>
    </ConfettiContext.Provider>
  )
}

export const useCelebrate = () => {
  const ctx = useContext(ConfettiContext)
  if (!ctx)
    throw new Error('useCelebrate should be used inside ConfettiProvider')

  return () =>
    ctx({
      shapes: [PAWN_SHAPE],
      particleCount: 100,
      spread: 200,
      scalar: 6,
    })
}
