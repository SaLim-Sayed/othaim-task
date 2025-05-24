"use client";

import ProductCard from "@/src/components/Product/ProductCard";
import ProductSkeleton from "@/src/components/ui/Skeleton/ProductSkeleton";
import Center from "@/src/components/ui/Center";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProductResponse } from "@/src/@types/product";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import { useProductStore } from "@/src/store/useProductStore";
import Hero from "./Hero";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    usePaginatedQuery<ProductResponse>({
      key: ["ProductList"],
      url: "https://dummyjson.com/products",
      limit: 20,
    });

  const { ref, inView } = useInView();
  const { products, setProducts, appendProducts } = useProductStore();

   useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

   useEffect(() => {
    if (data) {
      const allNewProducts = data.pages.flatMap((page) => page.products);
      if (products.length === 0) {
        setProducts(allNewProducts);
      } else {
        appendProducts(
          allNewProducts.filter((p) => !products.find((x) => x.id === p.id))
        );
      }
    }
  }, [data]);

   return (
    <Center>
      <Hero />
      <div data-testid="product-list" className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-8 py-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {(isFetchingNextPage || isLoading) &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={`skeleton-${i}`} />
          ))}
      </div>
      <div ref={ref} className="h-10" />
    </Center>
  );
}
