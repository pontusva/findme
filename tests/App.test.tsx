import React from 'react'
import App from '../src/App'
import { describe, it } from 'vitest'
import { render } from './test-utils'
describe('App', () => {
  it('Renders the App component', () => {
    render(<App />)
  })
})
