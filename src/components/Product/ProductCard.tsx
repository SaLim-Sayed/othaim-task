'use client';

import { Product } from '@/src/@types/product';
import Image from 'next/image';
import React from 'react';
 
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="rounded-xl shadow-md border bg-white p-4 flex flex-col hover:shadow-lg transition-all duration-200">
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
      <div className="mt-auto flex items-center justify-between">
        <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
        <span className="text-xs text-gray-400">{product.category}</span>
      </div>
    </div>
  );
};

export default ProductCard;
