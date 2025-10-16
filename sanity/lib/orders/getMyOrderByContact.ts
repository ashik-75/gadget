import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

// Import your types here in a real project
// import { Order } from '@/sanity.types';

// --- Paste the example types from Step 1 here if you don't have generated types ---------------------------------------------------

export async function getMyOrdersByContact(
  customerEmail?: string,
  customerPhone?: string
) {
  // 1. Add explicit return type
  if (!customerEmail && !customerPhone) {
    throw new Error('Either customerEmail or customerPhone is required')
  }

  const GET_MY_ORDERS_QUERY_BY_CONTACT = defineQuery(`
      *[_type == "order" && (
        customerEmail == $customerEmail || customerPhone == $customerPhone
      )] | order(_createdAt desc) {
        ...,
        products[] {
          ...,
          product->
        }
      }
    `)

  try {
    // 2. Use a type assertion to tell TypeScript the shape of the result
    const orders = await sanityFetch({
      query: GET_MY_ORDERS_QUERY_BY_CONTACT,
      params: { customerEmail, customerPhone }
    })

    return orders.data || []
  } catch (error) {
    console.error('Error fetching orders by contact:', error)
    // Ensure the error path also returns the correct type
    return []
  }
}
