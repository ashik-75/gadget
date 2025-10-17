'use client'

import { GET_PRODUCT_QUERYResult, Product } from '@/sanity.types'
import useCartStore from '@/stores/cart.store'
import { useRouter } from 'next/navigation'

type Props = {
  product: GET_PRODUCT_QUERYResult
}

export default function BuyNowProduct({ product }: Props) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  if (!product) return null

  const outOfStock = product.stock === 0

  return (
    <button
      disabled={outOfStock}
      onClick={() => {
        addItem(product as unknown as Product)
        router.push('/checkout')
      }}
      className="py-2 font-black flex w-full shrink-0 justify-center gap-3 hover:scale-105 transition-transform disabled:opacity-50 disabled:pointer-events-none px-2 border bg-black text-white"
    >
      {outOfStock ? 'Out of stock' : 'Buy Now'}
    </button>
  )
}
