import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { ResponsiveToaster } from '@/components/ui/ResponsiveToaster'
import './globals.css'
import 'sileo/styles.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Creator Intake Review Agent — Influur',
  description: 'Review creator applications for brand campaigns',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="h-full antialiased">
        {children}
        <ResponsiveToaster />
      </body>
    </html>
  )
}
