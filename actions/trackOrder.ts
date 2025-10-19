'use server'

import { getMyOrdersByContact } from '@/sanity/lib/orders/getMyOrderByContact'

export async function trackOrderAction(formData: FormData) {
  const orderNumber = formData.get('orderNumber')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()

  if (!orderNumber && !phone) {
    return {
      success: false,
      message: 'Please provide orderNumber or phone number.'
    }
  }

  try {
    const orders = await getMyOrdersByContact(orderNumber, phone)
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
