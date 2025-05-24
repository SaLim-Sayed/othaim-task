"use client";

import { useApiQuery } from "@/src/hooks/useApiQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Category {
  slug: string;
  name: string;
  url: string;
}

type CategoryList = Category[];

export default function Categories() {
  const router = useRouter();

  const {
    data: categories,
    isLoading,
    error,
  } = useApiQuery<CategoryList>({
    key: ["categories"],
    url: "https://dummyjson.com/products/categories",
  });

  if (isLoading) return <div> </div>;
 
  return (
    <div className=" fixed top-20 bg-[#f7f6fa] left-0 right-0  w-full z-20    ">
      <div className="container mx-auto">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, FreeMode]}
          className="w-full"
        >
          {categories?.map((category) => (
            <SwiperSlide key={category.slug} style={{ width: "auto" }}>
              <Link
                href={`/category/${category.slug}`}
                className="text-sm px-4 py-2 inline-block bg-white border border-gray-200 rounded hover:bg-primary-50 text-gray-700"
              >
                {category.name}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
