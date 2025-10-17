'use client'

import { Category } from '@/sanity.types'
import CartSheet from './cart'
import MobileSearch from './mobile-search'
import MobileSidebar from './mobile-sidebar'
import User from './user'

export default function RightHeader({
  categories
}: {
  categories: Category[]
}) {
  return (
    <nav className="flex items-center shrink-0 gap-2  sm:gap-8 justify-end">
      <MobileSearch />

      <CartSheet />
      <User />
      <MobileSidebar categories={categories} />
    </nav>
  )
}
