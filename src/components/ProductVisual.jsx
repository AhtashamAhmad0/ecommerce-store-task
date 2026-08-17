import { Droplet, Palette, Heart, Wind, SprayCan, Flower2, Sun, Brush } from 'lucide-react'

const ICONS = {
  skincare: Droplet,
  makeup: Palette,
  'lip-care': Heart,
  'hair-care': Wind,
  fragrances: SprayCan,
  'face-care': Flower2,
  'body-care': Sun,
  'beauty-accessories': Brush,
}

// Cycle of on-brand gradient pairs derived from the palette
const GRADIENTS = [
  ['#6B2440', '#93395C'],
  ['#B9944C', '#D8BE8A'],
  ['#6F7A5C', '#A5AF8F'],
  ['#45162A', '#6B2440'],
  ['#93395C', '#B9944C'],
  ['#6F7A5C', '#45162A'],
]

export default function ProductVisual({ category, accent = 0, className = '', shape = 'bottle' }) {
  const Icon = ICONS[category] || Droplet
  const [c1, c2] = GRADIENTS[accent % GRADIENTS.length]
  const gid = `grad-${category}-${accent}`

  return (
    <svg viewBox="0 0 200 240" className={className} role="img" aria-label={`${category} product illustration`}>
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      {shape === 'jar' ? (
        <>
          <rect x="40" y="70" width="120" height="130" rx="18" fill={`url(#${gid})`} />
          <rect x="52" y="40" width="96" height="36" rx="12" fill="#241C1A" opacity="0.85" />
          <ellipse cx="100" cy="70" rx="48" ry="10" fill="#241C1A" opacity="0.35" />
        </>
      ) : (
        <>
          <rect x="70" y="20" width="24" height="22" rx="4" fill="#241C1A" />
          <path d="M65 42 L135 42 L145 220 Q145 232 133 232 L67 232 Q55 232 55 220 Z" fill={`url(#${gid})`} />
          <rect x="55" y="130" width="90" height="46" fill="#F8F2E9" opacity="0.16" />
        </>
      )}
      <circle cx="100" cy="150" r="26" fill="#F8F2E9" opacity="0.9" />
      <foreignObject x="80" y="130" width="40" height="40">
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon color={c1} size={22} strokeWidth={1.75} />
        </div>
      </foreignObject>
    </svg>
  )
}
