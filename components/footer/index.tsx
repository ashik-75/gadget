export default function Footer() {
  return (
    <div className="bg-zinc-900">
      <div className="text-sm max-w-7xl mx-auto text-white px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="py-10 px-4 md:px-4 min-[1320px]:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Store Information */}
              <div>
                <h3 className="font-semibold text-base mb-4">
                  Store Information
                </h3>
                <div className="space-y-2">
                  <p>123 Commerce Street</p>
                  <p>Dhaka, Bangladesh 1000</p>
                  <p className="pt-2">
                    <a href="tel:+8801234567890" className="hover:underline">
                      +880 11111-88488
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:info@ecommerce-store.com"
                      className="hover:underline"
                    >
                      your@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="font-semibold text-base mb-4">Our Details</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/shipping" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/returns" className="hover:underline">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
