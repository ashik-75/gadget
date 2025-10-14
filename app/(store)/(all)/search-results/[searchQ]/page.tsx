import ProductCard from '@/components/products/product-card'
import { AskingQuestion } from '@/icons/asking-question'
import { GET_PRODUCTS_QUERYResult } from '@/sanity.types'
import { getProducts } from '@/sanity/lib/products/getProducts'
import { Suspense } from 'react'
// import LeftCollection from './@sidebar'

export default async function ProductsPage({
  params
}: {
  params: Promise<{
    searchQ: string
  }>
}) {
  const { searchQ } = await params

  const products = (await getProducts({
    q: searchQ
  })) as GET_PRODUCTS_QUERYResult

  return (
    <div className="w-full min-h-[600px] max-w-7xl mx-auto p-10 space-y-5">
      {/* <LeftCollection /> */}
      <section className="w-full">
        <Suspense key={`${searchQ}`}>
          {products.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-stone-300">
              <AskingQuestion className="mx-auto" width={100} />
              <h2 className="font-larken pt-5 text-2xl tracking-tight">
                Oops! <br />
              </h2>
              <p className="text-sm">
                No products were found with the selected filters
              </p>
            </div>
          )}
        </Suspense>
      </section>
    </div>
  )
}
