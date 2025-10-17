'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import type { Category } from '@/sanity.types'
import Link from 'next/link'

export default function CategoryNavMenu({
  categories
}: {
  categories: Category[]
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black hidden sm:inline-block">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[220px] p-3">
            <ul className="grid gap-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/categories/${category.slug?.current}`}
                      className="block rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 transition-colors"
                    >
                      {category.title}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
