import { Button } from "@heroui/react";
import { BiCartAdd } from "react-icons/bi";
import StarRating from "@/src/components/ui/StarRating";
import { Product } from "@/src/@types/product";

interface ProductInfoProps {
  product: Product;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
  isPending?: boolean;
}

export default function ProductInfo({
  product,
  count,
  onIncrease,
  onDecrease,
  onAddToCart,
  isPending,
}: ProductInfoProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-sm text-gray-500">{product.brand}</p>

      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold text-green-600">
          ${product.price.toFixed(2)}
        </p>
        <span className="text-sm text-red-500">
          -{product.discountPercentage}% off
        </span>
      </div>

      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} />
        <span className="text-xs text-gray-500">
          ({product.rating.toFixed(1)})
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border-2 px-3 rounded w-fit">
          <Button
            variant="light"
            size="sm"
            isIconOnly
            onPress={onDecrease}
            disabled={count === 1}
          >
            -
          </Button>
          <span className="px-3">{count}</span>
          <Button variant="light" size="sm" isIconOnly onPress={onIncrease}>
            +
          </Button>
        </div>

        <Button
          onPress={onAddToCart}
          size="lg"
          variant="flat"
          color="secondary"
          radius="full"
          isIconOnly
          isLoading={isPending}
          className="h-12 bg-black text-white"
        >
          <BiCartAdd size={24} />
        </Button>
      </div>

      <p className="text-gray-700">{product.description}</p>

      <p className="text-sm text-gray-600">Category: {product.category}</p>
      <p className="text-sm text-gray-600">In Stock: {product.stock}</p>

      {product.shippingInformation && (
        <div className="mt-4">
          <p className="font-medium">Shipping Info:</p>
          <p className="text-sm text-gray-600">{product.shippingInformation}</p>
        </div>
      )}

      {product.warrantyInformation && (
        <div className="mt-4">
          <p className="font-medium">Warranty:</p>
          <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
        </div>
      )}
    </div>
  );
}