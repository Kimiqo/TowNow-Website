import { motion, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  to?: string
  onClick?: () => void
}

export default function MagneticButton({ children, className, href, to, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const springX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    springX.set(x * 0.25) // pull factor
    springY.set(y * 0.25)
  }

  const handleMouseLeave = () => {
    springX.set(0)
    springY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block relative cursor-interactive"
    >
      {to ? (
        <Link to={to} className={className} onClick={onClick}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </motion.div>
  )
}
