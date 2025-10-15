import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock the necessary modules
jest.mock('next/navigation', () => ({
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
    render(<Home />)
    expect(document.body).toBeInTheDocument()
  })
})
