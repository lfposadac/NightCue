import { ReactNode } from 'react'
import './../styles/globals.css'
import { Navigation } from '@/components/navigation/Navigation'
import { font } from './font'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}


export default function RootLayout ({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
