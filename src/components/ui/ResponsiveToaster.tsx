'use client'

import { useEffect, useState } from 'react'
import { Toaster } from 'sileo'

const MOBILE_BREAKPOINT = 768

export function ResponsiveToaster() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Toaster
      position={isMobile ? 'top-center' : 'bottom-left'}
      theme="light"
      options={{ fill: '#18181b' }}
    />
  )
}
