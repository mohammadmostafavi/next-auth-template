import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/providers'
import Header from '@/components/layouts/header'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EDlant',
  description: 'Test Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (

    <html lang="en">
      <body className={inter.className}>

        <Provider>
          <Header />
          <div>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
