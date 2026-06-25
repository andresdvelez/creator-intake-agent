import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Toaster } from 'sileo'
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
          <Toaster position="bottom-left" theme="light" options={{ fill: '#18181b' }} />
        </body>
    </html>
  )
}
