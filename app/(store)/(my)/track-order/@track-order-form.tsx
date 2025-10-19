'use client'

import { trackOrderAction } from '@/actions/trackOrder'
import { formatPriceBDT } from '@/lib/utils'
import { GET_MY_ORDERS_QUERY_BY_CONTACTResult } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import { useState } from 'react'

export default function TrackOrderForm() {
  const [orders, setOrders] = useState<GET_MY_ORDERS_QUERY_BY_CONTACTResult>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setOrders([])
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await trackOrderAction(formData)
    setLoading(false)

    if (!result.success) {
      setError(result.message ?? '')
      return
    }

    setOrders(result.orders ?? [])
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Track your order by order number or phone number
      </h1>

      {/* ==== Form ==== */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          type="text"
          name="orderNumber"
          placeholder="Order Number"
          className="w-full p-2 border border-gray-300 bg-white rounded text-sm outline-none"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number (optional)"
          className="w-full p-2 border border-gray-300 bg-white rounded text-sm outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded text-sm hover:bg-black/80"
        >
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>

      {/* ==== Error ==== */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* ==== Orders ==== */}
      {orders.length > 0 && (
        <div className="divide-y divide-gray-200 border rounded-lg">
          {orders.map((order) => (
            <div key={order._id} className="p-4">
              <div className="space-y-2 mb-5">
                <p>
                  Order Number:{' '}
                  <span className="font-medium text-black">
                    {order.orderNumber}
                  </span>
                </p>
                <p>Status: {order?.status}</p>
                <p>Date: {new Date(order._createdAt).toLocaleDateString()}</p>
                <p>Total price: {formatPriceBDT(order.totalPrice)}</p>
              </div>

              <div className="bg-lime-500/30 p-3 rounded-xl">
                {order.products?.map((p) => (
                  <div
                    key={p._key}
                    className="flex gap-3 items-center py-2 border-b last:border-b-0 border-gray-200"
                  >
                    <div className="w-[60px] rounded-xl min-w-[60px] aspect-square overflow-hidden">
                      <picture>
                        <img
                          className="w-full h-full object-cover"
                          src={
                            p.product?.images?.[0]
                              ? urlFor(p.product.images[0]).url()
                              : '/placeholder.png'
                          }
                          alt={p.product?.name ?? 'Product image'}
                        />
                      </picture>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{p.product?.name}</p>
                      <p className="text-xs text-gray-500">Qty: {p.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-lime-700">
                      {formatPriceBDT(
                        (p.product?.price ?? 0) * (p.quantity ?? 0)
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
