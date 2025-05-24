'use client';

import { Product } from '@/src/@types/product';
import AddToCartDialog from '@/src/components/Product/AddToCartDialog';
import { showToast } from '@/src/hooks/showToast';
import { useCartStore } from '@/src/store/cartStore';
import { useDisclosure } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiCartAdd } from 'react-icons/bi';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddToCart = (
  ) => {
    onClose();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      total: product.price,
      discountPercentage: product.discountPercentage || 0,
      discountedPrice: (product.price * (1 - (product.discountPercentage || 0) / 100)) * 1,
      thumbnail: product.thumbnail,
    });
    showToast("success", "Product added to cart");
  };
  return (
    <div className="relative rounded-xl shadow-md border bg-white p-4 flex flex-col hover:shadow-lg transition-all duration-200">
      <Link href={`/product/${product?.id}`}>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-primary-600 font-bold">${product.price.toFixed(2)}</span>
          <span className=" text-gray-400">{product.category}</span>
        </div>
      </Link>

      <button
        onClick={onOpen}
        className="h-12 absolute top-4 right-4 bg-black text-white rounded-full p-2"
      >
        <BiCartAdd size={24} />
      </button>

      <AddToCartDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleAddToCart}
        product={product}
        quantity={1}
      />
    </div>
  );
};

export default ProductCard;
