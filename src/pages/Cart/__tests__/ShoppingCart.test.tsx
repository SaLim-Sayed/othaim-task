import React from 'react';
 
import { useCartStore } from '@/src/store/cartStore';
import { showToast } from '@/src/hooks/showToast';
import { useRouter } from 'next/navigation';
import ShoppingCart from '../Cart';
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the cart store and other dependencies
jest.mock('@/src/store/cartStore');
jest.mock('@/src/hooks/showToast');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('ShoppingCart Component', () => {
  const mockCartData = {
    products: [
      {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        quantity: 2,
        total: 199.98,
        discountPercentage: 10,
        discountedPrice: 179.98,
        thumbnail: '/test-image.jpg',
      },
    ],
    total: 199.98,
    discountedTotal: 179.98,
    totalQuantity: 2,
  };

  const mockUpdateItemQuantity = jest.fn();
  const mockRemoveItem = jest.fn();
  const mockClearCart = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      return selector({
        cartData: mockCartData,
        updateItemQuantity: mockUpdateItemQuantity,
        removeItem: mockRemoveItem,
        clearCart: mockClearCart,
      });
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty cart message when no products', () => {
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      return selector({
        cartData: { products: [], total: 0, discountedTotal: 0, totalQuantity: 0 },
      });
    });

    render(<ShoppingCart />);
    expect(screen.getByText('Your cart is empty')).toBeTruthy();
    expect(screen.getByText('Continue Shopping')).toBeTruthy();
  });

  test('renders cart items when products exist', () => {
    render(<ShoppingCart />);
    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$99.99')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('$179.98')).toBeTruthy();
  });

  test('increases item quantity when + button clicked', () => {
    render(<ShoppingCart />);
    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith(1, 3);
  });

  test('decreases item quantity when - button clicked', () => {
    render(<ShoppingCart />);
    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith(1, 1);
  });

  test('does not decrease quantity below 1', () => {
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      return selector({
        cartData: {
          ...mockCartData,
          products: [{ ...mockCartData.products[0], quantity: 1 }],
        },
        updateItemQuantity: mockUpdateItemQuantity,
      });
    });

    render(<ShoppingCart />);
    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);
    expect(mockUpdateItemQuantity).not.toHaveBeenCalled();
  });

  test('shows remove confirmation dialog when trash icon clicked', () => {
    render(<ShoppingCart />);
    const removeButton = screen.getByRole('button', { name: /trash/i });
    fireEvent.click(removeButton);
    expect(screen.getByText('Remove Item')).toBeTruthy();
    expect(
      screen.getByText('Are you sure you want to remove this item from your cart?')
    ).toBeTruthy();
  });

  

  
});