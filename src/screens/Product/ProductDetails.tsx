"use client";

import SkeletonCard from "@/src/components/ui/Skeleton/SkeletonCard";
import AddToCartDialog from "../../components/Product/AddToCartDialog";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import { useProductDetails } from "../../hooks/useProductDetails";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string;
  const {
    data,
    isLoading,
    error,
    count,
    isOpen,
     handleIncrease,
    handleDecrease,
    showAddToCartDialog,
    confirmAddToCart,
    onClose,
  } = useProductDetails(id);

  if (isLoading) return <SkeletonCard />;
  if (error || !data)
    return <div className="p-8 text-red-500">Failed to load product.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductImage src={data.thumbnail} alt={data.title} />
      
      <ProductInfo 
        product={data}
        count={count}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onAddToCart={showAddToCartDialog}
       />
      
      <AddToCartDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmAddToCart}
        product={data}
        quantity={count}
       />
    </div>
  );
}