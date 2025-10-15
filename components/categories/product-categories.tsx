'use client'

import { Category } from '@/sanity.types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function ProductCategories({
  categories
}: {
  categories: Category[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const activeCategory = pathname.split('/')[1] // e.g. /beef → "beef"

  const handleCategoryClick = (slug?: string) => {
    if (!slug) return
    router.push(`/${slug}`)
  }

  return (
    <ul className="flex gap-2 text-black text-sm flex-wrap">
      {categories.map((category) => (
        <li key={category._id}>
          <Link
            href={`/${category.slug?.current}`}
            data-selected={
              activeCategory === category.slug?.current ? '' : undefined
            }
            onClick={() => handleCategoryClick(category.slug?.current)}
            className="group rounded-full border flex flex-wrap items-center text-nowrap py-1 text-xs px-4 bg-zinc-100 data-[selected]:text-white data-[selected]:bg-yellow-500"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
