import React, { memo } from "react";
import MovieItem from "./MovieItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../carousel/Swiper.css";
import { Navigation } from "swiper/modules";


const Movies = ({ data }) => {
  return (
    <div>
      {!data?.results || data.results.length === 0 ? (
        <div className="text-center text-white text-lg mt-4">
          Movies not available.
        </div>
      ) : (
        <div className="flex gap-2 justify-center flex-wrap container">
          <Swiper
            loop={true}
            navigation={true}
            spaceBetween={10}
            slidesPerView={5}
            modules={[Navigation]}
            className="CardSwiper"
          >
            {data.results.map((item, index) => (
              <SwiperSlide key={index} className="rounded-xl">
                <MovieItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default memo(Movies);
