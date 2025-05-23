'use client';

import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

interface CustomSwiperProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
  swiperConfig?: any;
}

export default function CustomSwiper({ items, renderItem, swiperConfig }: CustomSwiperProps) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 1, end: 1 });
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isFirstActive, setIsFirstActive] = useState(true);
  const [isLastActive, setIsLastActive] = useState(false);

  useEffect(() => {
    if (!swiperRef.current) return;

    const updateRange = () => {
      const swiper = swiperRef.current!;
      const currentSlidesPerView = Math.round(swiper.params.slidesPerView as number) || 1;
      setSlidesPerView(currentSlidesPerView);

      const start = swiper.activeIndex + 1;
      const end = Math.min(start + currentSlidesPerView - 1, items.length);
      setVisibleRange({ start, end });

       setIsFirstActive(swiper.activeIndex === 0);
      setIsLastActive(swiper.activeIndex + currentSlidesPerView >= items.length);
    };

    updateRange();
    swiperRef.current.on('slideChange', updateRange);
    swiperRef.current.on('resize', updateRange);
  }, [items]);

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        {...swiperConfig}
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

       <div className="flex items-center justify-end mt-4">
        <button
          onClick={() => swiperRef.current?.slidePrev && swiperRef.current?.slidePrev()}
          className={`p-2 bg-primaryColor-900 text-secondaryColor-900 rounded-full hover:bg-yellow-200 
            ${isFirstActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isFirstActive}
        >
          <FaChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2 px-4">
          {slidesPerView === 1 ? (
            <span className="text-secondaryColor-900">{visibleRange.start}</span>
          ) : (
            <>
              <span className="text-secondaryColor-900">{visibleRange.start}</span>
              <span className="text-secondaryColor-900">-</span>
              <span className="text-secondaryColor-900">{visibleRange.end}</span>
            </>
          )}
          <span className="text-secondaryColor-900">of</span>
          <span className="text-secondaryColor-900">{items.length}</span>
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext && swiperRef.current?.slideNext()}
          className={`p-2 bg-primaryColor-900 text-secondaryColor-900 rounded-full hover:bg-yellow-200 
            ${isLastActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLastActive}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
