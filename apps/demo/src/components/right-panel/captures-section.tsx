import type { FC } from 'react'

export const CapturesSection: FC<{ assets: string[]; material: number }> = ({
  assets,
  material,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1 justify-start">
      {material > 0 && <span>({material})</span>}
      {assets.sort().map((asset, i) => (
        <img
          key={`white-captures-${i}`}
          width={25}
          height={25}
          src={asset}
        ></img>
      ))}
    </div>
  )
}
