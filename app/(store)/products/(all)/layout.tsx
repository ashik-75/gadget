import React from 'react'
import LeftCollection from './@sidebar'
import CollectionSidebarSort from './@sidebar-sort'

export default function LayoutCollections({
  children
}: Readonly<{
  children?: React.ReactNode
}>) {
  return (
    <div className="flex py-4 w-full max-w-7xl mx-auto">
      <LeftCollection />
      <section className="w-full px-5">{children}</section>
      <CollectionSidebarSort />
    </div>
  )
}
