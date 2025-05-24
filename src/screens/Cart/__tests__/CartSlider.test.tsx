import { fireEvent, render, screen } from "@testing-library/react";
import CartSlider from "../../../screens/Cart/CartSlider"; // تأكد من صحة المسار
import { useCartStore } from "../../../store/cartStore";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    __esModule: true,
    useRouter: jest.fn(),
}));

jest.mock("../../../store/cartStore", () => ({
    useCartStore: jest.fn(),
}));
jest.mock("../../../hooks/showToast", () => ({
    showToast: jest.fn(),
}));


jest.mock("@heroui/react", () => ({
    Button: ({ children, onPress, ...props }: any) => (
        <button onClick={onPress} {...props}>
            {children}
        </button>
    ),
    Drawer: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    DrawerContent: ({ children }: any) => <div>{typeof children === "function" ? children(() => { }) : children}</div>,
    DrawerHeader: ({ children }: any) => <div>{children}</div>,
    DrawerBody: ({ children }: any) => <div>{children}</div>,
    DrawerFooter: ({ children }: any) => <div>{children}</div>,
}));


const mockRouterPush = jest.fn();
const mockUpdateItemQuantity = jest.fn();
const mockRemoveItem = jest.fn();

describe("CartSlider", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            cartData: {
                totalQuantity: 2,
                total: 150,
                discountedTotal: 130,
                products: [
                    {
                        id: 1,
                        title: "Product 1",
                        quantity: 2,
                        price: 100,
                        total: 200,
                        discountPercentage: 10,
                        discountedPrice: 90,
                        thumbnail: "/image.webp",
                    },
                ],
            },
            updateItemQuantity: mockUpdateItemQuantity,
            removeItem: mockRemoveItem,
        });

        (useRouter as jest.Mock).mockReturnValue({
            push: mockRouterPush,
        });
    });

    it("renders cart items and totals", () => {
        render(<CartSlider isOpen={true} onOpenChange={() => { }} />);
        expect(screen.getByText(/Your Cart/i)).toBeTruthy();
        expect(screen.getByText(/Product 1/i)).toBeTruthy();
    });

    it("calls removeItem when remove button is clicked", () => {
        render(<CartSlider isOpen={true} onOpenChange={() => { }} />);
        const removeButton = screen.getByTestId("remove-item");
        fireEvent.click(removeButton);
        expect(mockRemoveItem).toBeTruthy()
    });

    it("calls updateItemQuantity when quantity is changed", () => {
        render(<CartSlider isOpen={true} onOpenChange={() => { }} />);
        const quantityInput = screen.getByTestId("increase-quantity");
        fireEvent.click(quantityInput);
        expect(mockUpdateItemQuantity).toBeTruthy()
    });

    it("calls handleCheckout when checkout button is clicked", () => {
        render(<CartSlider isOpen={true} onOpenChange={() => { }} />);
        const checkoutButton = screen.getByTestId("checkout-button");
        fireEvent.click(checkoutButton);
        expect(mockRouterPush).toHaveBeenCalledWith("/order-confirmation");
    });
});
