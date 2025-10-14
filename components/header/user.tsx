'use client'

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import { BsPerson } from 'react-icons/bs'
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
          <button className="border text-sm flex gap-1 items-center p-1 px-2 rounded-sm">
            <BsPerson />
            Sign In
          </button>
        </SignInButton>
      )}
    </ClerkLoaded>
  )
}
