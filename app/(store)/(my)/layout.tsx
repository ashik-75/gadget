import React from 'react'

export default function MyLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="w-full max-w-7xl py-5 mx-auto">{children}</div>
}
