import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="p-5 max-w-sm mx-auto text-center space-y-5 mt-20">
      <h1 className="text-3xl font-[900]">404 Page Not Found</h1>

      <p>The page you were looking for does not exist.</p>

      <div>
        <Link href="/" className="text-blue-500 underline">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
