'use client'

import { Category } from '@/sanity.types'
import CartSheet from './cart'
import MobileSearch from './mobile-search'
import MobileSidebar from './mobile-sidebar'

export default function RightHeader({
  categories
}: {
  categories: Category[]
}) {
  return (
    <nav className="flex items-center shrink-0 gap-4  sm:gap-8 justify-end">
      <MobileSearch />

      <CartSheet />

      <MobileSidebar categories={categories} />
    </nav>
  )
}
