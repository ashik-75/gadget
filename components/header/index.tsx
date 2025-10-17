import { getAllCategories } from '@/sanity/lib/categories/getAllCategories'
import LeftHeader from './left'
import RightHeader from './right'

async function Header() {
  const categories = await getAllCategories()
  return (
    <header className=" bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto flex items-center  justify-between h-[90px] px-10">
        <LeftHeader categories={categories} />

        <RightHeader categories={categories} />
      </div>
    </header>
  )
}

export default Header
