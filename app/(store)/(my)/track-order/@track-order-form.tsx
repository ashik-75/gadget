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
        Track Your Order
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
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

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {orders.length > 0 && (
        <div className="divide-y divide-gray-200 border">
          {orders.map((order) => (
            <div key={order._id} className="p-4">
              <p className="text-sm text-gray-500">
                Order Number:{' '}
                <span className="font-medium text-black">
                  {order.orderNumber}
                </span>
              </p>
              <p>Status: {order?.status}</p>
              <p className="text-sm text-gray-500 mb-2">
                Date: {new Date(order._createdAt).toLocaleDateString()}
              </p>

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
                          src={urlFor(p.product!.images![0]).url()}
                          alt={p.product?.name}
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

      {!loading && orders.length === 0 && !error && (
        <p className="text-center text-gray-500">
          Enter email or phone to view your orders.
        </p>
      )}
    </div>
  )
}
