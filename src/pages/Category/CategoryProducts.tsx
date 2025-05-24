"use client";

import ProductCard from "@/src/components/Product/ProductCard";
import ProductSkeleton from "@/src/components/ui/Skeleton/ProductSkeleton";
import Center from "@/src/components/ui/Center";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProductResponse } from "@/src/@types/product";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import { useProductStore } from "@/src/store/useProductStore";
import { useParams } from "next/navigation";

export default function CategoryProducts() {
  const { slug } = useParams() as any;
  const id=slug
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    usePaginatedQuery<ProductResponse>({
      key: ["CategoryProducts", id],
      url: `https://dummyjson.com/products/category/${id}`,
      limit: 20,
    });

  const { ref, inView } = useInView();

  const {
    getCategoryProducts,
    setCategoryProducts,
    appendCategoryProducts,
    clearCategoryProducts,
  } = useProductStore();

  const products = getCategoryProducts(id);

   useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

   useEffect(() => {
    if (data) {
      const allNewProducts = data.pages.flatMap((page) => page.products);
      if (!products || products.length === 0) {
        setCategoryProducts(id, allNewProducts);
      } else {
        appendCategoryProducts(
          id,
          allNewProducts.filter((p) => !products.find((x) => x.id === p.id))
        );
      }
    }
  }, [data]);

   useEffect(() => {
    return () => {
      clearCategoryProducts(id);
    };
  }, []);

  return (
    <Center>
      <p className="text-2xl font-bold mb-4 text-purple-900">Products in {id}</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8  py-2">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {(isFetchingNextPage || isLoading) &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={`skeleton-${i}`} />
          ))}
      </div>
     </Center>
  );
}
