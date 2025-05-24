import { useState } from "react";
import { showToast } from "@/src/hooks/showToast";
import { useDisclosure } from "@heroui/react";
import { Product } from "@/src/@types/product";
import { useApiQuery } from "@/src/hooks/useApiQuery";
import { useCartStore } from "@/src/store/cartStore"; // Import the Zustand cart store

export function useProductDetails(id: string) {
  const [count, setCount] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCartStore(); // Get addItem from cart store

  const { data, isLoading, error } = useApiQuery<Product>({
    key: ["product", id],
    url: `https://dummyjson.com/products/${id}`,
  });

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  const showAddToCartDialog = () => {
    if (!data) return;
    setIsAdding(true);
    onOpen();
  };

  const confirmAddToCart = () => {
    if (!data) return;

    try {
      // Add to local cart store instead of API
      addItem({
        id: data.id,
        title: data.title,
        price: data.price,
        quantity: count,
        total: data.price * count,
        discountPercentage: data.discountPercentage || 0,
        discountedPrice: (data.price * (1 - (data.discountPercentage || 0) / 100)) * count,
        thumbnail: data.thumbnail,
      });

      showToast("success", "Product added to cart successfully!");
      onClose();
      setIsAdding(false);
      setCount(1);  
    } catch (error) {
      showToast("danger", "Failed to add product to cart.");
      onClose();
      setIsAdding(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    count,
    isOpen,
    isAdding,
    handleIncrease,
    handleDecrease,
    showAddToCartDialog,
    confirmAddToCart,
    onClose,
  };
}