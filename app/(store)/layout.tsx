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

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="es" suppressHydrationWarning>
      <head>{/* your <link rel="stylesheet"> font links etc. */}</head>
      <body className="antialiased font-hellix bg-[rgb(251,255,244)] min-h-svh text-black">
        <ClerkProvider
          dynamic
          appearance={{
            baseTheme: neobrutalism
          }}
          localization={enUS}
        >
          <NextTopLoader color="#ff9142" height={2} />
          <ThemeProvider>
            {isEnabled && (
              <>
                <DrafModeDisable />
                <VisualEditing />
              </>
            )}
            <Toaster />
            <Header />
            <main className="min-h-[700px]">{children}</main>
            <Footer />
            <SanityLive />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
