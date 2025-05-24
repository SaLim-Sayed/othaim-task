import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ProductImage from '../ProductImage'
  
describe('ProductImage', () => {
  it('renders a heading', () => {
    render(<ProductImage src="" alt="" />)
 
    const heading = screen.getByTestId('product-image')
 
    expect(heading).toBeInTheDocument()
  })
})