'use client'

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import { BsPerson } from 'react-icons/bs'
export default function User() {
  const { user } = useUser()
  return (
    <div className="hidden sm:block">
      <ClerkLoaded>
        {user ? (
          <UserButton
            appearance={{
              baseTheme: neobrutalism
            }}
          />
        ) : (
          <SignInButton mode="modal">
            <button className="flex gap-1 items-center p-1 px-2 text-sm rounded-sm">
              <BsPerson size={25} />
            </button>
          </SignInButton>
        )}
      </ClerkLoaded>
    </div>
  )
}
