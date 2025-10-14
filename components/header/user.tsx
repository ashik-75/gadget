'use client'

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
export default function User() {
  const { user } = useUser()
  return (
    <ClerkLoaded>
      {user ? (
        <UserButton
          appearance={{
            baseTheme: neobrutalism
          }}
        />
      ) : (
        <SignInButton mode="modal">
          <button className="bg-black text-lime-50 p-3 px-4 rounded-sm font-medium">
            To Enter
          </button>
        </SignInButton>
      )}
    </ClerkLoaded>
  )
}
