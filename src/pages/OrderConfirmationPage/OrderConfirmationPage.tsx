"use client";

import Link from "next/link";
import { useCartStore } from "@/src/store/cartStore";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import { FaCheckCircle } from "react-icons/fa";
 
export default function OrderConfirmationPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
     clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 text-center">
      <FaCheckCircle className="text-green-500 mb-6" size={64} />
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <Link href="/">
        <Button color="secondary" size="lg">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
