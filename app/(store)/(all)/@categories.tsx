import { getAllCategories } from '@/sanity/lib/categories/getAllCategories'
import CollectionSidebarCategories from './@product-categories'

export default async function Categories() {
  const categories = await getAllCategories()
  return (
    <aside className="block space-y-4 max-w-7xl p-10 mx-auto w-full">
      <CollectionSidebarCategories categories={categories} />
    </aside>
  )
}
