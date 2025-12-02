import type { Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Playfair_Display, Merriweather } from "next/font/google";
import '@workspace/ui/globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "900"]
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"]
})

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${playfair.variable} ${merriweather.variable} min-h-screen flex flex-col justify-between relative bg-bg text-[#e5e5e5]`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}