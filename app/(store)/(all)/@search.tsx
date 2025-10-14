'use client'

import Form from 'next/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
    <Form action="/products" className="w-full flex gap-2 max-w-sm">
      <label className="block relative w-full">
        <div className="absolute pointer-events-none inset-y-0 px-4 text-black/30 flex items-center">
          <IoIosSearch size={20} />
        </div>
        <input
          autoFocus
          name="q"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={q || ''}
          className="border p-3 w-full text-sm px-12 outline-none text-black rounded-sm bg-white border-neutral-200 placeholder:text-stone-400"
          placeholder="Search"
        />
      </label>
    </Form>
  )
}
