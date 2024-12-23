import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "./Swiper.css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export const Carousel = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="my-5 container mx-auto">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false, 
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {data.results?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${item.backdrop_path}`}
                alt="Backdrop"
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                  {item.title || "No Title"}
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm mt-2">
                  {item.release_date} • {item.original_language.toUpperCase()}
                </p>
                <button
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition"
                >
                  Смотреть
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-5"
      >
        {data.results?.map((item) => (
          <SwiperSlide key={item.id} className="cursor-pointer">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${item.backdrop_path}`}
              alt="Thumbnail"
              className="w-full h-[80px] sm:h-[100px] md:h-[120px] object-cover rounded-md hover:opacity-80 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


