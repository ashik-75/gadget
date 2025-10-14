'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ClearCart from './@clear-cart'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const order_number = searchParams.get('order_number')

  return (
    <div className="text-center py-20 px-4 w-full max-w-xl mx-auto">
      <div className="border rounded-md bg-lime-100 p-4">
        <ClearCart order_number={order_number} />
        <h1 className="font-larken text-base">Thank you for your purchase!</h1>
        <p className="pt-5 text-xs">Your order has been confirmed.</p>
        <div className="text-left border-y text-sm py-5 border-dotted border-stone-600 mt-4">
          <div className="flex justify-between">
            <p>Order number:</p>
            <p>{order_number}</p>
          </div>
        </div>
        <div className="text-left text-sm py-4">
          Please check your email for more details about your order.
        </div>
        <div className="space-y-3 pt-5 gap-2">
          <Link
            href="/orders"
            className="p-3 py-2 bg-black text-lime-100 block rounded-sm px-5"
          >
            View order details
          </Link>
          <Link
            href="/products"
            className="border p-3 py-2 block hover:bg-white/10 rounded-sm border-stone-700 px-5"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
