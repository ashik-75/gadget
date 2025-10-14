'use client'

import Form from 'next/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { GoArrowRight } from 'react-icons/go'
import { IoIosSearch } from 'react-icons/io'

export default function Search() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')

  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (q?: string) => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    )

    if (!q) {
      currentSearchParams.delete('q')
    } else currentSearchParams.set('q', q)
    const search = currentSearchParams.toString()
    const query = search ? `?${search}` : ''
    router.push(`${pathname}${query}`)
  }

  return (
    <Form action="/products" className="w-full flex gap-2 max-w-xl mx-auto">
      <label className="block relative w-full">
        <div className="absolute pointer-events-none inset-y-0 px-4 text-black/30 flex items-center">
          <IoIosSearch size={20} />
        </div>
        <input
          autoFocus
          name="q"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={q || ''}
          className="border p-3 w-[200px] text-sm px-12 text-black rounded-sm bg-white border-neutral-200 placeholder:text-stone-400"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex justify-center">
          <button
            title="Search"
            className="hover:scale-110 px-4 opacity-50 transition-transform"
          >
            <GoArrowRight size={25} />
          </button>
        </div>
      </label>
    </Form>
  )
}
