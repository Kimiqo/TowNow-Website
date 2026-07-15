import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springX = useSpring(cursorX, { stiffness: 400, damping: 28, mass: 0.2 })
  const springY = useSpring(cursorY, { stiffness: 400, damping: 28, mass: 0.2 })
  
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, select, textarea, .cursor-interactive')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  // Hide default cursor globally
  useEffect(() => {
    document.body.style.cursor = 'none'
    const style = document.createElement('style')
    style.innerHTML = `
      * { cursor: none !important; }
      @media (max-width: 768px) {
        * { cursor: auto !important; }
        #custom-cursor { display: none !important; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.body.style.cursor = 'auto'
      document.head.removeChild(style)
    }
  }, [])

  return (
    <motion.div
      id="custom-cursor"
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0
      }}
      animate={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        backgroundColor: isHovering ? '#fff' : '#FF6B35',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  )
}
