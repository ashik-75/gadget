'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Category } from '@/sanity.types'
import Link from 'next/link'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function MobileSidebar({
  categories = []
}: {
  categories?: Category[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button title="Menu" className=" sm:hidden">
          <GiHamburgerMenu size={20} />
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
                        href={`/categories/${cat.slug?.current}`}
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

          {/* === Extra Links === */}
          <AccordionItem value="info">
            <AccordionTrigger className="text-sm font-medium">
              More
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 mt-2">
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
      </SheetContent>
    </Sheet>
  )
}
