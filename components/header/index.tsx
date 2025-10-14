import Image from 'next/image'
import Link from 'next/link'

import CenterHeader from './center'
import RightHeader from './right'

async function Header() {
  return (
    <header className=" bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto flex items-center  justify-between h-[90px] px-10">
        <nav className="bg-yellow-300">
          <Link href="/">
            <Image
              title="Ir a la página principal"
              height={70}
              width={70}
              src="/logo.webp"
              className="invert"
              alt="Logo 366 Clothing"
            />
          </Link>
        </nav>
        <CenterHeader />
        <RightHeader />
      </div>
    </header>
  )
}

export default Header
