'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { Category } from '@/sanity.types'

export default function CollectionSidebarCategories({
  categories
}: {
  categories: Category[]
}) {
  const [searchParams, handleSearch] = useSearchParams('category')
  const currentSearch = searchParams.get('category')

  return (
    <ul className="flex flex-col gap-1 text-black text-sm">
      {categories.map((category) => (
        <li key={category._id}>
          <button
            data-selected={
              currentSearch === category.slug?.current ? '' : undefined
            }
            onClick={() => handleSearch(category.slug?.current ?? '')}
            className="hover:underline group flex items-center gap-2 data-[selected]:underline text-nowrap data-[selected]:text-black py-1 px-2 rounded-full"
          >
            <div className="w-2 rounded-full group-hover:outline-lime-600 group-data-[selected]:bg-lime-700 group-data-[selected]:outline-lime-700 outline-stone-400 aspect-square outline-[1px] outline outline-offset-2"></div>
            {category.title}
          </button>
        </li>
      ))}
      {currentSearch && (
        <li className="pl-6">
          <button
            onClick={() => handleSearch(currentSearch)}
            className="text-xs text-blue-600"
          >
            Remove category filter
          </button>
        </li>
      )}
    </ul>
  )
}
