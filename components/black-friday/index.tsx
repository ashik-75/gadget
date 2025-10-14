import { COUPON_CODES } from '@/sanity/lib/sale/couponCode'
import { getActiveSaleByCouponCode } from '@/sanity/lib/sale/getActiveSaleByCouponCode'
import React from 'react'

export default async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BLACKFRIDAY)

  if (!sale) return null
  return (
    <div className="text-center py-20 bg-black text-lime-50">
      <h3 className="text-4xl font-larken tracking-tight pb-5">{sale.title}</h3>
      <p className="text-base">
        Usa el código{' '}
        <span className="font-bold text-lime-300">{sale.couponCode}</span> para
        obtener un{' '}
        <span className="font-semibold text-lime-300">
          {sale.discountAmount}%
        </span>{' '}
        de descuento en tus compras.
      </p>
    </div>
  )
}
