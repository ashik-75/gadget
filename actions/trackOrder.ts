'use server'

import { getMyOrdersByContact } from '@/sanity/lib/orders/getMyOrderByContact'

export async function trackOrderAction(formData: FormData) {
  const email = formData.get('email')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()

  if (!email && !phone) {
    return { success: false, message: 'Please provide email or phone number.' }
  }

  try {
    const orders = await getMyOrdersByContact(email, phone)
    if (orders.length === 0) {
      return {
        success: false,
        message: 'No orders found for provided details.'
      }
    }
    return { success: true, orders }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Failed to fetch orders.' }
  }
}
