'use server'

import { backendClient } from '@/sanity/lib/backendClient'

interface ShippingAddress {
  name: string
  phone: string
  district: string
  upazila: string
  street: string
}

interface OrderData {
  orderNumber: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  clerkUserId: string
  shippingAddress: ShippingAddress
  products: Array<{
    _key: string
    product: {
      _type: 'reference'
      _ref: string
    }
    quantity: number
  }>
  totalPrice: number
  currency: string
  status: string
  orderDate: string
  paymentMethod: string
}

// Explicitly type the return value
export async function createOrder(
  orderData: OrderData
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const order = await backendClient.create({
      _type: 'order',
      ...orderData
    })
    return { success: true, orderId: order._id }
  } catch (error) {
    console.error('Error creating order:', error)
    return { success: false, error: 'Failed to create order' }
  }
}
