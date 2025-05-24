"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import Image from "next/image";
import { FiTrash2, FiX } from "react-icons/fi";
import { useState } from "react";
import { useCartStore } from "@/src/store/cartStore";
import { showToast } from "@/src/hooks/showToast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartSliderProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSlider({ isOpen, onOpenChange }: CartSliderProps) {
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const { cartData, updateItemQuantity, removeItem } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    showToast("success", "Proceeding to checkout!");
    router.push("/order-confirmation"); 
  };
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
    showToast("success","Item removed from cart" )
    setItemToRemove(null);
  };

  return (
    <Drawer
      radius="none"
      isOpen={isOpen}
       hideCloseButton
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Your Cart ({cartData?.totalQuantity || 0} items)
                <Link href="/cart" onClick={onClose} className="text-purple-900 ml-2">View Cart</Link>
              </h2>

              <Button isIconOnly variant="light" size="sm" onPress={onClose}>
                <FiX size={20} />
              </Button>
            </DrawerHeader>

            <DrawerBody className="space-y-6">
              {!cartData || cartData.products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartData.products.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-contain"
                            sizes="80px"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            ${item.price?.toFixed(2)}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border rounded">
                              <Button
                                variant="light"
                                size="sm"
                                isIconOnly
                                onPress={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity === 1}
                              >
                                -
                              </Button>
                              <span className="px-3">{item.quantity}</span>
                              <Button
                                variant="light"
                                size="sm"
                                isIconOnly
                                onPress={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>

                            <Button
                              variant="light"
                              color="danger"
                              isIconOnly
                              size="sm"
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
                            <p className="text-xs text-gray-500 line-through">
                              ${item.total?.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </DrawerBody>

            <DrawerFooter>
              <div className="flex flex-col flex-1">
                {cartData && (
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartData.total?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-green-600">
                        -$
                        {(cartData.total - cartData.discountedTotal)?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span>Total</span>
                      <span>${cartData.discountedTotal?.toFixed(2)}</span>
                    </div>
                  </div>
                )}
                <Button
                  color="secondary"
                  className="w-full"
                  isDisabled={!cartData || cartData.products.length === 0}
                  onPress={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </DrawerFooter>

            {itemToRemove !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                  <h3 className="font-bold text-lg mb-4">Remove Item</h3>
                  <p className="mb-6">
                    Are you sure you want to remove this item from your cart?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="light"
                      onPress={() => setItemToRemove(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => handleRemoveItem(itemToRemove)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
