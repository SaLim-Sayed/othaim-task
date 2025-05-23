// src/config/swiperConfig.ts
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export const swiperConfig = {
  modules: [Navigation, Scrollbar],
  spaceBetween: 20,
  slidesPerView: 3.5,
  scrollbar: { draggable: true },
  grabCursor: true,
  touchEventsTarget: 'container',
  freeMode: true,
  breakpoints: {
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 2.2 },
    425: { slidesPerView: 1.4 },
    320: { slidesPerView: 1.09 },
  },
};
