import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductInfo from '../ProductInfo';
import { Product } from '@/src/@types/product';

export const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product',
  price: 100.00,
  discountPercentage: 10,
  rating: 4.5,
  stock: 20,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: 'https://via.placeholder.com/150',
  images: ['https://via.placeholder.com/150'],
  tags: ['test', 'brand'],
  sku: 'SKU123',
  weight: 100,
  dimensions: {
    width: 10,
    height: 20,
    depth: 30,
  },
  warrantyInformation: '1 year warranty',
  shippingInformation: 'Free shipping',
  availabilityStatus: 'In Stock',
  reviews: [],
  returnPolicy: '30-day return policy',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    barcode: '1234567890',
    qrCode: '1234567890',
  },
};

jest.mock('@heroui/react', () => ({
    Button: ({ children, onPress, ...props }: any) => (
      <button onClick={onPress} {...props}>{children}</button>
    ),
  }))
  
describe('ProductInfo', () => {
  it('renders the product info container', () => {
    render(
      <ProductInfo
        product={mockProduct}
        count={0}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onAddToCart={() => {}}
      />
    );

    const container = screen.getByTestId('product-info');

    expect(container).toBeInTheDocument();
  });

  it('renders the product title', () => {
    render(
      <ProductInfo
        product={mockProduct}
        count={0}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onAddToCart={() => {}}
      />
    );

    const title = screen.getByText(mockProduct.title);
 
    expect(title).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toBeInTheDocument();
   });

  it('renders the product price', () => {
    render(
      <ProductInfo
        product={mockProduct}
        count={0}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onAddToCart={() => {}}
      />
    );

    const price = screen.getByTestId('product-price');

    expect(price).toBeInTheDocument();
  });

  it('disables the "-" button when count is 1', () => {
    render(
      <ProductInfo
        product={mockProduct}
        count={1}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onAddToCart={() => {}}
      />
    );

    const minusButton = screen.getByTestId('decrease-button');
    const plusButton = screen.getByTestId('increase-button');
    expect(minusButton).toBeDisabled();
    expect(plusButton).not.toBeDisabled();
  });

  it('calls onAddToCart when add button is clicked', () => {
    const handleAddToCart = jest.fn();

    render(
      <ProductInfo
        product={mockProduct}
        count={1}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onAddToCart={handleAddToCart}
      />
    );

    const cartButton = screen.getByTestId('add-to-cart-button');

    fireEvent.click(cartButton);

    expect(handleAddToCart).toHaveBeenCalled();
  });
});
