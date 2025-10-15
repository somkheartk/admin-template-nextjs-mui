import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock the navigation module
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}))

describe('Home Page', () => {
  it('should render without crashing', () => {
    // This page redirects, so we just check it doesn't throw
    expect(() => {
      render(<Home />)
    }).not.toThrow()
  })
})
