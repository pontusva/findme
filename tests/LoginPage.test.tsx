import React from 'react'
import LoginPage from '../src/app/login/page'
import { describe, expect, it } from 'vitest'
import { render } from './test-utils'

describe('LoginPage', () => {
  it('Renders the LoginPage component', () => {
    const { getByText } = render(<LoginPage />)
    expect(getByText('Welcome to Lost Pets')).toBeDefined()
  })
})
