'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const GA_ID = 'G-40D6SPQ2G7'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}
