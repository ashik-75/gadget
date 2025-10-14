import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPriceBDT(amount: number | undefined | null): string {
  if (amount == null || isNaN(amount)) return 'Tk 0'

  return (
    'Tk ' +
    amount.toLocaleString('en-US', {
      minimumFractionDigits: 0
    })
  )
}
