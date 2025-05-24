import { render, screen, fireEvent } from "@testing-library/react";

import ShoppingCart from "../ShoppingCart";
import { useCartStore } from "../../../store/cartStore";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn()
}))

jest.mock("../../../store/cartStore", () => ({
  useCartStore: jest.fn(),
}));


jest.mock("../../../hooks/showToast", () => ({
  showToast: jest.fn(),
}));

jest.mock('@heroui/react', () => ({
  Button: ({ children, onPress, ...props }: any) => (
    <button onClick={onPress} {...props}>{children}</button>
  ),
}))

describe("Cart Component", () => {
  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cartData: {
        products: [
          { id: 1, name: "Product 1", quantity: 2, price: 100 },
          { id: 2, name: "Product 2", quantity: 1, price: 50 },
        ],
      },
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  const mockRouterPush = jest.fn();
  const mockUpdateItemQuantity = jest.fn();
  const mockRemoveItem = jest.fn();



  it("renders the cart with products", () => {
    render(<ShoppingCart />);
    expect(screen.getByTestId("cart-container")).toBeTruthy();
  });

  it("shows empty state when cart is empty", () => {

    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cartData: null,
    });
    render(<ShoppingCart />);
    expect(screen.getByText("Your Shopping Cart")).toBeTruthy();
    expect(screen.getByText("Your cart is empty")).toBeTruthy();
  });

  it("navigates to order confirmation on checkout", () => {

    render(<ShoppingCart />);
    const checkoutButton = screen.getByText("Proceed to Checkout");
    fireEvent.click(checkoutButton);
    expect(mockRouterPush).toHaveBeenCalledWith("/order-confirmation");
  });


  it("updates item quantity when changed", () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cartData: {
        products: [
          { id: 1, name: "Product 1", quantity: 2, price: 100 },
        ],
      },
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
    });
    render(<ShoppingCart />);
    const quantityInput = screen.getByTestId("increase-quantity-button");
    fireEvent.click(quantityInput);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("removes an item from the cart", () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cartData: {
        products: [
          { id: 1, name: "Product 1", quantity: 2, price: 100 },
        ],
      },
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
    });
    render(<ShoppingCart />);
    const removeButton = screen.getByTestId("remove-item-button");
    fireEvent.click(removeButton);
    expect(mockRemoveItem).toBeTruthy();
  });
});