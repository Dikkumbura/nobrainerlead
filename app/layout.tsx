import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

export const metadata: Metadata = {
  title: 'AI Lead Generation',
  description: 'Generate high-quality leads while you sleep with AI automation',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{fontFamily: '"Exo 2", sans-serif'}}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100..900&display=swap" />
      </head>
      <body style={{fontFamily: '"Exo 2", sans-serif'}}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
