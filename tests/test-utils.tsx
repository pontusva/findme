import React, { ReactElement } from 'react'
import {
  render,
  RenderOptions
} from '@testing-library/react'
import { ClerkProvider } from '@clerk/clerk-react'

const AllTheProviders = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <ClerkProvider
      publishableKey={
        import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
      }>
      {children}
    </ClerkProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
