import { getAllCategories } from '@/sanity/lib/categories/getAllCategories'
import Search from './@search'
import CollectionSidebarCategories from './@sidebar-categories'

export default async function LeftCollection() {
  const categories = await getAllCategories()
  return (
    <aside className="p-12 pr-0 pt-0 md:block hidden">
      <Search />
      <h2 className="text-xs text-black/50 pb-2 pl-2 pt-10">Categories</h2>
      <CollectionSidebarCategories categories={categories} />
    </aside>
  )
}
