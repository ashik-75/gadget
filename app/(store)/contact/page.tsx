// app/contact/page.tsx
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 font-larken">
          Get in Touch
        </h1>
        <p className="text-center text-gray-600">
          We’d love to hear from you! Reach out via email or phone for any
          inquiries.
        </p>
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <Mail className="w-6 h-6 text-zinc-800" />
            <Link
              href="mailto:info.hoque.com@gmail.com"
              className="text-lg text-zinc-800 hover:text-zinc-600 transition-colors"
            >
              info.hoque.com@gmail.com
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Phone className="w-6 h-6 text-zinc-800" />
            <Link
              href="tel:+8801404431330"
              className="text-lg text-zinc-800 hover:text-zinc-600 transition-colors"
            >
              014044 XXXXXXX
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
