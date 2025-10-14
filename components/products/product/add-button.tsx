'use client'

import { GET_PRODUCT_QUERYResult, Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import useCartStore from '@/stores/cart.store'
import { toast } from 'anni'
import { HiPlus } from 'react-icons/hi2'

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
                <img
                  src={urlFor(product.images[0]).url()}
                  alt=""
                  className="w-full h-full object-cover"
                />
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
      className="py-3 flex justify-center gap-3 hover:scale-110 transition-transform disabled:opacity-50 disabled:pointer-events-none px-5 w-full bg-lime-950 rounded-sm text-lime-50"
    >
      <HiPlus size={25} />
      {outOfStock ? 'Out of stock' : 'Add to cart'}
    </button>
  )
}
