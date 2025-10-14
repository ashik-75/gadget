'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'

export default function CenterHeader() {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')

  // Debounce: wait 500ms after user stops typing
  useEffect(() => {
    if (!searchInput) return

    const handler = setTimeout(() => {
      const query = encodeURIComponent(searchInput.trim())
      router.push(`/search-results/${query}`)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchInput, router])

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full flex gap-2 max-w-sm bg-orange-300"
    >
      <label className="block relative w-full">
        <div className="absolute pointer-events-none inset-y-0 px-4 text-black/30 flex items-center">
          <IoIosSearch size={20} />
        </div>
        <input
          autoFocus
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 w-full text-sm px-12 outline-none text-black rounded-sm bg-white border-neutral-200 placeholder:text-stone-400"
        />
      </label>
    </form>
  )
}
