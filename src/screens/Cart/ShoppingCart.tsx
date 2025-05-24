"use client";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { FiTrash2, FiX, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { showToast } from "@/src/hooks/showToast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/store/cartStore";
import SkeletonCard from "@/src/components/ui/Skeleton/SkeletonCard";

export default function ShoppingCart() {
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const router = useRouter();
  const {
    cartData,
    updateItemQuantity,
    removeItem,
    clearCart,

  } = useCartStore();

  const handleCheckout = () => {
    showToast("success", "Proceeding to checkout!");
    router.push("/order-confirmation");
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(productId, newQuantity);
  };

  const confirmRemove = () => {
    if (itemToRemove === null) return;
    removeItem(itemToRemove);
    showToast("success", "Item removed from cart!");
    setItemToRemove(null);
  };


  return (
    <div data-testid="cart-container" className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {!cartData || cartData.products.length === 0 ? (
        <div className="text-center py-12">
          <FiShoppingCart className="mx-auto text-5xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <Button
            color="primary"
            className="mt-6"
            onPress={() => window.history.back()}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow divide-y">
              {cartData.products.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="100px"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border rounded w-fit">
                        <Button
                          data-testid="decrease-quantity-button"
                          variant="light"
                          size="sm"
                          isIconOnly
                          onPress={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          -
                        </Button>
                        <span className="px-3">{item.quantity}</span>
                        <Button
                          data-testid="increase-quantity-button"
                          variant="light"
                          size="sm"
                          isIconOnly
                          onPress={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        data-testid="remove-item-button"
                        variant="light"
                        color="danger"
                        isIconOnly
                        onPress={() => setItemToRemove(item.id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ${item.discountedPrice?.toFixed(2)}
                    </p>
                    {item.discountPercentage > 0 && (
                      <p className="text-sm text-gray-500 line-through">
                        ${item.total.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartData?.totalQuantity} items)</span>
                  <span>${cartData?.total?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">
                    -${(cartData?.total - cartData?.discountedTotal)?.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${cartData?.discountedTotal?.toFixed(2)}</span>
                </div>
              </div>

              <Button
                data-testid="checkout-button"
                color="secondary"
                className="w-full"
                size="lg"
                onPress={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <Button
                data-testid="continue-shopping-button"
                variant="light"
                className="w-full mt-3"
                onPress={() => window.history.back()}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Removal Confirmation Dialog */}
      {itemToRemove !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="font-bold text-lg mb-4">Remove Item</h3>
            <p className="mb-6">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-end space-x-3">
              <Button data-testid="cancel-remove-button" variant="light" onPress={() => setItemToRemove(null)}>
                Cancel
              </Button>
              <Button data-testid="confirm-remove-button" color="danger" onPress={confirmRemove}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}