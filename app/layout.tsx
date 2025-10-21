import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shop for electronic products and accessories',
  description: 'Shop for electronic products and accessories',
  keywords: ['electronics', 'tech'],
  authors: { name: 'Ashik Rana', url: 'https://example.com' }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
