import { getAllCategories } from '@/sanity/lib/categories/getAllCategories'
import Link from 'next/link'

export default async function Categories() {
  const categories = await getAllCategories()
  return (
    <aside className="block space-y-4 max-w-7xl p-5 mx-auto w-full">
      {categories.map((category) => (
        <Link key={category._id} href={`/categories/${category.slug?.current}`}>
          <div
            key={category._id}
            className="p-4 border border-zinc-800 rounded-md hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <h2 className="font-larken text-2xl">{category.title}</h2>
            <p className="text-sm text-zinc-400 mt-2">{category.description}</p>
          </div>
        </Link>
      ))}
    </aside>
  )
}
