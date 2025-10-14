'use client'

import { useSearchParams } from '@/hooks/use-search-params'

const sorts = {
  last_added: 'Last added',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low'
}

export default function CollectionSidebarSort() {
  const [searchParams, handleSort] = useSearchParams('sort')
  const currentSort = searchParams.get('sort')

  return (
    <aside className="p-12 pl-0 pt-0 md:block hidden">
      <h2 className="text-xs text-black/60 text-nowrap pb-2">Sort by</h2>
      <ul className="flex flex-col gap-2">
        {Object.entries(sorts).map(([key, value]) => (
          <li key={key}>
            <button
              data-active={currentSort === key ? '' : undefined}
              onClick={() => handleSort(key)}
              className="text-black text-sm text-nowrap hover:underline data-[active]:underline data-[active]:text-lime-600"
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
