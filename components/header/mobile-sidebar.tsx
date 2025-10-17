'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Category } from '@/sanity.types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function MobileSidebar({
  categories = []
}: {
  categories?: Category[]
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button title="Menu" className="hover:text-neutral-600 sm:hidden">
          <GiHamburgerMenu size={24} />
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>

        {/* Accordion Menu */}
        <Accordion type="single" collapsible className="w-full mt-6 space-y-2">
          {/* === Categories === */}
          <AccordionItem value="categories">
            <AccordionTrigger className="text-sm font-medium">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              {categories.length > 0 ? (
                <ul className="space-y-2 mt-2">
                  {categories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        href={`/${cat.slug?.current}`}
                        onClick={() => setOpen(false)}
                        className="block px-2 py-1 rounded hover:bg-neutral-100 text-sm"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500 px-2 py-1">
                  No categories found.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* === Account === */}
          <AccordionItem value="account">
            <AccordionTrigger className="text-sm font-medium flex items-center gap-2">
              <FaUserCircle size={18} /> Account
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 mt-2">
                <li>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-1 rounded hover:bg-neutral-100 text-sm"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-1 rounded hover:bg-neutral-100 text-sm"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-1 rounded hover:bg-neutral-100 text-sm"
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* === Extra Links === */}
          <AccordionItem value="info">
            <AccordionTrigger className="text-sm font-medium">
              More
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 mt-2">
                <li>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-1 rounded hover:bg-neutral-100 text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-1 rounded hover:bg-neutral-100 text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Optional footer */}
        <div className="mt-auto pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false)
              router.push('/help')
            }}
            className="w-full text-sm"
          >
            Help & Support
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
