import Link from 'next/link'

export default function Hero() {
  return (
    <section className="space-y-5 block py-[100px]">
      {/* Background with gradient overlay */}

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Badge or announcement */}
        <div className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-800 gap-2 rounded-full text-sm font-medium">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-lime-500"></span>
          </span>
          New Collection Available Now
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
          Discover Next Generation
          <span className="block text-lime-600">Tech Essentials</span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Shop our curated collection of premium products designed to elevate
          your everyday experience.
        </p>

        {/* CTA buttons */}
        <div className=" gap-2 pt-4">
          <Link
            href={'/products'}
            className="px-8 py-4 inline-block bg-lime-950 text-white font-medium rounded-lg hover:bg-lime-900 transition-all transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>

          {/* Social proof or trust indicators */}
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.8/5 Rating</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-lime-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
