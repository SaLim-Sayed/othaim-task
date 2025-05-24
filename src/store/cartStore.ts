import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface CartData {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface CartStore {
  cartData: CartData | null;
  addItem: (item: CartItem) => void;
  updateItemQuantity: (productId: number, newQuantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartData: null,
      addItem: (item) => {
        const currentCart = get().cartData;
        if (!currentCart) {
          const newCart: CartData = {
            id: 1,
            products: [item],
            total: item.total,
            discountedTotal: item.discountedPrice,
            userId: 1,
            totalProducts: 1,
            totalQuantity: item.quantity,
          };
          return set({ cartData: newCart });
        }

        const existingItemIndex = currentCart.products.findIndex(
          (product) => product.id === item.id
        );

        let updatedProducts = [...currentCart.products];
        let updatedTotal = currentCart.total;
        let updatedDiscountedTotal = currentCart.discountedTotal;
        let updatedTotalQuantity = currentCart.totalQuantity;

        if (existingItemIndex >= 0) {
          // Item exists, update quantity
          const existingItem = updatedProducts[existingItemIndex];
          updatedProducts[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + item.quantity,
            total: existingItem.total + item.total,
            discountedPrice:
              existingItem.discountedPrice + item.discountedPrice,
          };
        } else {
          // New item
          updatedProducts.push(item);
        }

        updatedTotal += item.total;
        updatedDiscountedTotal += item.discountedPrice;
        updatedTotalQuantity += item.quantity;

        set({
          cartData: {
            ...currentCart,
            products: updatedProducts,
            total: updatedTotal,
            discountedTotal: updatedDiscountedTotal,
            totalProducts: updatedProducts.length,
            totalQuantity: updatedTotalQuantity,
          },
        });
      },
      updateItemQuantity: (productId, newQuantity) => {
        const currentCart = get().cartData;
        if (!currentCart || newQuantity < 1) return;

        const itemIndex = currentCart.products.findIndex(
          (item) => item.id === productId
        );
        if (itemIndex === -1) return;

        const item = currentCart.products[itemIndex];
        const quantityDiff = newQuantity - item.quantity;

        const updatedProducts = [...currentCart.products];
        updatedProducts[itemIndex] = {
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity,
          discountedPrice:
            item.price * (1 - item.discountPercentage / 100) * newQuantity,
        };

        const updatedTotal = currentCart.total + item.price * quantityDiff;
        const updatedDiscountedTotal =
          currentCart.discountedTotal +
          item.price * (1 - item.discountPercentage / 100) * quantityDiff;

        set({
          cartData: {
            ...currentCart,
            products: updatedProducts,
            total: updatedTotal,
            discountedTotal: updatedDiscountedTotal,
            totalQuantity: currentCart.totalQuantity + quantityDiff,
          },
        });
      },
      removeItem: (productId) => {
        const currentCart = get().cartData;
        if (!currentCart) return;

        const itemIndex = currentCart.products.findIndex(
          (item) => item.id === productId
        );
        if (itemIndex === -1) return;

        const item = currentCart.products[itemIndex];
        const updatedProducts = currentCart.products.filter(
          (product) => product.id !== productId
        );

        set({
          cartData: {
            ...currentCart,
            products: updatedProducts,
            total: currentCart.total - item.total,
            discountedTotal: currentCart.discountedTotal - item.discountedPrice,
            totalProducts: updatedProducts.length,
            totalQuantity: currentCart.totalQuantity - item.quantity,
          },
        });
      },
      clearCart: () => {
        set({ cartData: null });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
