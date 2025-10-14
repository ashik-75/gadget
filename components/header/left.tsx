'use client'

import { Category } from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { HiXMark } from 'react-icons/hi2'
import PopularCategoriesMobile from './categories-mobile'

export default function LeftHeader({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <nav className="flex-grow basis-0 text-sm">
      <button onClick={() => setIsOpen(true)} className="flex lg:hidden">
        <CgMenuLeft size={25} />
      </button>
      <div
        data-open={isOpen ? '' : undefined}
        data-closed={isOpen ? undefined : ''}
        className="fixed transition-all lg:hidden block data-[open]:opacity-100 duration-300 data-[open]:translate-x-0 -translate-x-full opacity-0 z-[999] overflow-y-auto inset-0 bg-white/80 backdrop-blur-md"
      >
        <header className="h-[90px] flex justify-between items-center px-10">
          <div className="flex basis-0 flex-grow">
            <button onClick={() => setIsOpen(false)}>
              <HiXMark size={35} />
            </button>
          </div>
          <div className="flex">
            <Image
              height={70}
              width={70}
              src="/logo.webp"
              alt="Logo 366 Clothing"
            />
          </div>
          <div className="flex basis-0 justify-end flex-grow"></div>
        </header>
        <header>
          <h2 className="border-b text-2xl font-larken border-stone-300 p-5">
            Popular Categories
          </h2>
        </header>
        <PopularCategoriesMobile categories={categories} />
        <header>
          <h2 className="border-b text-2xl font-larken border-stone-200 p-5">
            Menu
          </h2>
        </header>
        <div className="flex flex-col p-5 text-black">
          <Link
            className="hover:underline p-2 py-3 text-2xl font-larken block"
            href="/cart"
          >
            Your Cart
          </Link>
          <Link
            className="hover:underline p-2 py-3 text-2xl font-larken block"
            href="/orders"
          >
            Your Orders
          </Link>
        </div>
      </div>
    </nav>
  )
}
