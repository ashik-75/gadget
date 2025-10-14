'use client'

import { AskingQuestion } from '@/icons/asking-question'
import { formatPriceBDT } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import useCartStore from '@/stores/cart.store'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight, BsPlus } from 'react-icons/bs'
import { HiMinus } from 'react-icons/hi2'

// Define the shipping address interface
interface ShippingAddress {
  name: string
  phone: string
  district: string
  upazila: string
  street: string
}

export default function CartList() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  const [isLoading, setIsLoading] = React.useState(false)
  const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>(
    {
      name: '',
      phone: '',
      district: '',
      upazila: '',
      street: ''
    }
  )

  const { isSignedIn, user } = useUser()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // In your CartList component
  const handleCheckout = async () => {
    if (!isSignedIn) return

    // Validate shipping address
    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.district ||
      !shippingAddress.upazila ||
      !shippingAddress.street
    ) {
      alert('Please fill in all shipping address fields')
      return
    }

    setIsLoading(true)

    try {
      // Type the orderData explicitly
      const orderNumber = crypto.randomUUID()
      const orderData = {
        orderNumber: orderNumber,
        customerName: user.fullName ?? 'Unknown',
        customerEmail: user.primaryEmailAddress?.emailAddress ?? 'Unknown',
        clerkUserId: user.id,
        shippingAddress: shippingAddress,
        products: items.map((item) => ({
          _key: crypto.randomUUID(),
          product: {
            _type: 'reference' as const,
            _ref: item.product._id
          },
          quantity: item.quantity
        })),
        totalPrice: getTotalPrice(),
        currency: 'BDT',
        status: 'pending',
        orderDate: new Date().toISOString()
      }

      // Dynamic import of the server action
      const { createOrder } = await import('@/actions/createOrder')

      // Create the order using server action
      const result = await createOrder(orderData)

      if (!result.success) {
        throw new Error(result.error || 'Failed to create order')
      }

      // Clear the cart after successful order
      clearCart()

      // Redirect to order confirmation page

      window.location.href = `/success?order_number=${orderNumber}`
    } catch (error) {
      console.error(error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex gap-5 flex-col lg:flex-row">
      <div className="flex-grow">
        <ul className="flex flex-col w-full flex-grow divide-y divide-stone-700">
          {items.map((item) => {
            const totalPrice = item.quantity * (item.product.price ?? 0)
            return (
              <li
                key={item.product._id}
                className="py-3 gap-5 px-7 w-full flex items-center"
              >
                <div className="w-[80px] rounded-xl min-w-[80px] aspect-square overflow-hidden">
                  <picture>
                    <img
                      className="w-full h-full object-cover"
                      src={urlFor(item.product.images![0]).url()}
                      alt={item.product.name}
                    />
                  </picture>
                </div>
                <div className="w-full">
                  <Link
                    className="hover:underline"
                    href={'/products/' + item.product.slug?.current}
                  >
                    <h3>{item.product.name}</h3>
                  </Link>
                  {Array.isArray(item.product.description) && (
                    <p className="text-xs text-stone-400 pt-2 line-clamp-2">
                      {item.product.description
                        ?.map((desc) =>
                          desc._type === 'block'
                            ? desc.children
                                ?.map((child) => child.text)
                                .join(' ')
                            : ' '
                        )
                        .join(' ')}
                    </p>
                  )}
                  <div className="flex pt-2 items-center gap-3">
                    <p className="text-sm flex-grow">
                      {formatPriceBDT(totalPrice)}
                    </p>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="border rounded-sm bg-black text-lime-100 p-1"
                      >
                        <HiMinus size={15} />
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => addItem(item.product)}
                        className="border rounded-sm bg-black text-lime-100 p-1"
                      >
                        <BsPlus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {items.length === 0 && (
          <div className="py-10">
            <AskingQuestion
              width={200}
              height={200}
              className="text-blue-500 mx-auto"
            />
            <p className="text-center max-w-[40ch] mx-auto p-10 text-sm">
              There are no products in your cart. Add some from our{' '}
              <Link href="/products" className="text-blue-500 hover:underline">
                catalog.
              </Link>
            </p>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <footer className="max-lg:border-t max-lg:px-7 min-w-[350px] border-dotted border-stone-200 max-lg:pt-5">
          <p>Order Summary</p>
          <div className="flex py-1 text-sm">
            <span className="flex flex-grow text-stone-400">Items:</span>
            <p>{items.length}</p>
          </div>
          <div className="flex py-1 text-sm border-t border-stone-300 pt-3 mt-3">
            <span className="flex flex-grow text-black">Subtotal:</span>
            <p>{formatPriceBDT(getTotalPrice())}</p>
          </div>

          {isSignedIn && (
            <div className="mt-3">
              <h3 className="font-medium mb-3">Shipping Address</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-white outline-none rounded text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-white outline-none rounded text-sm"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    value={shippingAddress.district}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-white outline-none rounded text-sm"
                    placeholder="District"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Upazila</label>
                  <input
                    type="text"
                    name="upazila"
                    value={shippingAddress.upazila}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-white outline-none rounded text-sm"
                    placeholder="Upazila"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-white outline-none rounded text-sm"
                    placeholder="Street Address"
                  />
                </div>
              </div>
            </div>
          )}

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full disabled:justify-center disabled:opacity-50 disabled:grayscale flex justify-between gap-2 items-center p-3 px-4 hover:scale-105 transition-all rounded-sm bg-lime-950 text-lime-50 mt-5"
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  Place Order
                  <BsArrowRight size={20} />
                </>
              )}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full disabled:opacity-50 disabled:grayscale flex justify-center gap-2 items-center p-3 px-4 hover:scale-105 transition-all rounded-sm bg-lime-950 text-lime-50 mt-5">
                Sign In
              </button>
            </SignInButton>
          )}
        </footer>
      )}
    </div>
  )
}
