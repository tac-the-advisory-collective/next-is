// app/(core)/components/Providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
// import { ThemeProvider } from '@/components/ui/theme-provider' // example
// import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {/* <ThemeProvider> */}
        {/* <Toaster /> */}
        {children}
      {/* </ThemeProvider> */}
    </SessionProvider>
  )
}
