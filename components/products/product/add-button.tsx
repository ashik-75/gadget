'use client'

import { GET_PRODUCT_QUERYResult, Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import useCartStore from '@/stores/cart.store'
import { toast } from 'anni'

type Props = {
  product: GET_PRODUCT_QUERYResult
}

export default function AddButtonProduct({ product }: Props) {
  if (!product) return null

  const addItem = useCartStore((state) => state.addItem)

  const outOfStock = product.stock === 0

  return (
    <button
      disabled={outOfStock}
      onClick={() => {
        addItem(product as unknown as Product)
        toast(
          <div className="flex items-center gap-2 p-2">
            {product.images && product.images?.length > 0 && (
              <div className="w-10 aspect-[10/8] rounded-md overflow-hidden">
                <picture>
                  <img
                    src={urlFor(product.images[0]).url()}
                    alt={product.name || 'Product image'}
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
            )}
            <div>
              <p className="max-w-sm font-semibold text-ellipsis overflow-hidden">
                {product.name}
              </p>
              <p className="text-xs">Added to cart</p>
            </div>
          </div>,
          {
            className: '!p-0'
          }
        )
      }}
      className="py-2 font-black shrink-0 flex w-full justify-center gap-3 hover:scale-105 transition-transform disabled:opacity-50 disabled:pointer-events-none px-2 border border-zinc-600"
    >
      {outOfStock ? 'Out of stock' : 'Add to cart'}
    </button>
  )
}
