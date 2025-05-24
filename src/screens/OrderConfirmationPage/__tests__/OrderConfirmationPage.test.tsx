import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import OrderConfirmationPage from '../OrderConfirmationPage'
   
describe('OrderConfirmationPage', () => {
  it('renders a heading', () => {
    render(<OrderConfirmationPage />)
 
    const heading = screen.getByTestId('order-confirmation-page')
 
    expect(heading).toBeInTheDocument()
  })

  it('renders back to home button', () => {
    render(<OrderConfirmationPage />)
 
    const button = screen.getByTestId('back-to-home-button')
 
    expect(button).toBeInTheDocument()
  })
})