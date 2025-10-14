import Hero from '@/components/hero'
import React from 'react'
import LeftCollection from './@sidebar'
import CollectionSidebarSort from './@sidebar-sort'

export default function LayoutCollections({
  children
}: Readonly<{
  children?: React.ReactNode
}>) {
  return (
    <>
      <Hero />

      <div className="flex py-4 w-full min-h-[600px] max-w-7xl mx-auto">
        <LeftCollection />
        <section className="w-full px-5">{children}</section>
        <CollectionSidebarSort />
      </div>
    </>
  )
}
