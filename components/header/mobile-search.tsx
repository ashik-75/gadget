'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { IoIosSearch } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

export default function MobileSearch() {
  const router = useRouter()
  const [searchInput, setSearchInput] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    const query = encodeURIComponent(searchInput.trim())
    setOpen(false)

    // Wait for drawer close animation
    setTimeout(() => {
      router.push(`/search?type=${query}`)
    }, 250)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <IoIosSearch size={20} />
      </DrawerTrigger>

      <DrawerContent className="h-[200px] border-b bg-white shadow-md">
        <div className="mx-auto w-full max-w-sm py-6">
          <DrawerTitle className="text-center text-base font-medium">
            Search Products
          </DrawerTitle>

          <div className="mt-4">
            <form
              onSubmit={handleSubmit}
              className="w-full flex gap-2 max-w-sm"
            >
              <label className="block relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-black/30 pointer-events-none">
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

              <Button type="submit" className="px-4">
                Search
              </Button>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
