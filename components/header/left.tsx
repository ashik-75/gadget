import { Category } from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryNavMenu from '../categories'

const LeftHeader: FC<{ categories: Category[] }> = async ({ categories }) => {
  return (
    <nav className="flex items-center gap-8">
      <Link href="/">
        <Image
          title="Ir a la página principal"
          height={70}
          width={70}
          src="/logo.webp"
          className="invert"
          alt="Logo 366 Clothing"
        />
      </Link>

      <CategoryNavMenu categories={categories} />
    </nav>
  )
}

export default LeftHeader
