'use client'

import { Category } from '@/sanity.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function ProductCategories({
  categories
}: {
  categories: Category[]
}) {
  const pathname = usePathname()
  const activeCategory = pathname.split('/')[1]
  const isHome = pathname === '/' || pathname === ''

  const totalItems = categories.length + 1 // +1 for "All"

  const [visibleThreshold, setVisibleThreshold] = useState(6)

  // 🔹 Dynamically adjust threshold based on screen width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 480)
        setVisibleThreshold(3) // mobile
      else if (window.innerWidth < 768)
        setVisibleThreshold(4) // tablet
      else if (window.innerWidth < 1024)
        setVisibleThreshold(5) // small desktop
      else setVisibleThreshold(6) // large screens
    }

    handleResize() // Run on mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const showArrows = totalItems > visibleThreshold

  return (
    <div className="relative w-full max-w-full px-5">
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 2
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {/* === All Category === */}
          <CarouselItem className="pl-2 basis-auto">
            <Link
              href="/"
              data-selected={isHome ? '' : undefined}
              className="group rounded-full border flex items-center text-nowrap py-1 text-xs px-4 bg-zinc-100 data-[selected]:text-white data-[selected]:bg-yellow-500 whitespace-nowrap"
            >
              All
            </Link>
          </CarouselItem>

          {/* === Dynamic Categories === */}
          {categories.map((category) => (
            <CarouselItem key={category._id} className="pl-2 basis-auto">
              <Link
                href={`/${category.slug?.current}`}
                data-selected={
                  activeCategory === category.slug?.current ? '' : undefined
                }
                className="group rounded-full border flex items-center text-nowrap py-1 text-xs px-4 bg-zinc-100 data-[selected]:text-white data-[selected]:bg-yellow-500 whitespace-nowrap"
              >
                {category.title}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* === Navigation Buttons (conditionally visible) === */}
        {showArrows && (
          <>
            <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full w-6 h-6 flex items-center justify-center" />
            <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full w-6 h-6 flex items-center justify-center" />
          </>
        )}
      </Carousel>
    </div>
  )
}
