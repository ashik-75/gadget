'use client'

import { GET_PRODUCT_QUERYResult, Product } from '@/sanity.types'
import useCartStore from '@/stores/cart.store'
import { useRouter } from 'next/navigation'
import { HiPlus } from 'react-icons/hi2'

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
        router.push('/buy-now')
      }}
      className="py-1 flex shrink-0 justify-center gap-3 hover:scale-105 transition-transform disabled:opacity-50 disabled:pointer-events-none px-2 bg-yellow-900 rounded-sm text-lime-50"
    >
      <HiPlus size={25} />
      {outOfStock ? 'Out of stock' : 'Buy Now'}
    </button>
  )
}
