'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MyTabs() {
  const pathname = usePathname()
  const { isSignedIn } = useUser()

  const items = {
    cart: {
      title: 'Your cart',
      href: '/cart',
      active: pathname.endsWith('/cart'),
      disabled: false
    },
    orders: {
      title: 'Your orders',
      href: '/orders',
      active: pathname.endsWith('/orders'),
      disabled: !isSignedIn
    }
  }

  return (
    <header className="border-b border-stone-300">
      <nav className="flex max-w-4xl mx-auto w-full text-black">
        {Object.entries(items).map(
          ([key, item]) =>
            !item.disabled && (
              <Link
                data-active={item.active ? '' : undefined}
                className="px-4 py-2 hover:border-black data-[active]:border-black border-b border-black border-transparent text-nowrap data-[active]:text-lime-700"
                key={key}
                href={item.href}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
    </header>
  )
}
