"use client";

import ProductCard from "@/src/components/Product/ProductCard";
import ProductSkeleton from "@/src/components/ui/Skeleton/ProductSkeleton";
import { useInView } from "react-intersection-observer";
import Center from "@/src/components/ui/Center";
 import { useEffect } from "react";
 import { ProductResponse } from "@/src/@types/product";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";

export default function Home() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
      } = usePaginatedQuery<ProductResponse>({
        key: ['ProductList'],
        url: 'https://dummyjson.com/products',
        limit: 20,
      });

  const { ref, inView } = useInView();

  // fetch more when inView becomes true
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <Center>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 gap-8 mt-24 py-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {isFetchingNextPage||isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={`skeleton-${i}`} />
          ))}
      </div>
      {/* Observer trigger */}
      <div ref={ref} className="h-10" />
    </Center>
  );
}
