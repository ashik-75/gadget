'use client'

import useCartStore from '@/stores/cart.store'
import Link from 'next/link'
import { GiShoppingCart } from 'react-icons/gi'
import User from './user'

export default function RightHeader() {
  const items = useCartStore((state) => state.items)
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <nav className="flex items-center  gap-8 justify-end">
      <Link className="flex relative" href="/cart" title="Mi carrito de compra">
        <GiShoppingCart size={25} />
        {totalItems > 0 && (
          <div className="absolute w-5 h-5 grid place-content-center -top-2 -right-2 rounded-full bg-blue-700 text-white text-xs">
            {totalItems}
          </div>
        )}
      </Link>

      <User />
    </nav>
  )
}
