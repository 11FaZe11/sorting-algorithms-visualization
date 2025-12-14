import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fast Algorithms - Interactive Algorithm Visualizations",
  description:
    "Visualize and understand sorting algorithms with interactive step-by-step demonstrations. Explore bubble sort, quick sort, merge sort, and more with customizable color themes.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`font-sans antialiased dark`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
