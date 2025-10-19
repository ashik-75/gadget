'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Try again
      </button>
    </div>
  )
}
