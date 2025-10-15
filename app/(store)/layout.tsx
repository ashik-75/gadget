import type { Metadata } from 'next'
import '../globals.css'

import Categories from '@/components/categories'
import DrafModeDisable from '@/components/draft-mode/disable'
import Footer from '@/components/footer'
import Header from '@/components/header'
import ThemeProvider from '@/providers/theme'
import { SanityLive } from '@/sanity/lib/live'
import { enUS } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import { Toaster } from 'anni'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
  title: 'Shop for electronic products and accessories',
  description: 'Shop for electronic products and accessories',
  keywords: [
    'electronics',
    'tech',
    'Gadget',
    'trens',
    'fashion',
    'accessories',
    'Devise',
    'Mobile'
  ],
  authors: {
    name: 'Ashik Rana',
    url: 'https://example.com'
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      dynamic
      appearance={{
        baseTheme: neobrutalism
        // variables: {
        //   colorBackground: '#000',
        //   borderRadius: '.4rem',
        //   colorSuccess: '#00ff00'
        // }
      }}
      localization={enUS}
    >
      <html lang="es" suppressHydrationWarning>
        <head>
          <link
            rel="stylesheet"
            href="/fonts/hellix/Hellix-Medium.otf"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="/fonts/larken/Larken-Bold.otf"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="/fonts/larken/Larken-Medium.otf"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
        </head>
        <body
          suppressHydrationWarning
          className="antialiased font-hellix bg-[rgb(251,255,244)] min-h-svh text-black "
        >
          <NextTopLoader color="#ff9142" height={2} />
          <ThemeProvider>
            {(await draftMode()).isEnabled && (
              <>
                <DrafModeDisable />
                <VisualEditing />
              </>
            )}
            <Toaster />
            <Header />
            <Categories />
            <main className="min-h-[600px]">{children}</main>
            <Footer />
            <SanityLive />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
