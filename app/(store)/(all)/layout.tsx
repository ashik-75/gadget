import Categories from '@/components/categories'
import React from 'react'

export default function MyLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full flex flex-col">
      <Categories />
      <div>{children}</div>
    </div>
  )
}
