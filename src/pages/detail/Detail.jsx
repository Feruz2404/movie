import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { FaBookmark, FaShareAlt } from "react-icons/fa";
import Footer from "../../components/footer/Footer";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [images, setImages] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    request.get(`/movie/${id}`).then((res) => setData(res.data));
  }, [id]);

  useEffect(() => {
    request.get(`/movie/${id}/images`).then((res) => setImages(res.data));
  }, [id]);

  return (
    <div className="bg-black text-white px-4 py-8">
      {data && (
        <div className="relative max-w-screen-lg mx-auto">
          {images?.backdrops && images.backdrops.length > 0 && (
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${images.backdrops[0].file_path}`}
              alt="Movie Backdrop"
              className="w-full h-[400px] lg:h-[600px] object-cover rounded-lg shadow-lg"
            />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-16">
            <div className="absolute top-5 right-5 flex gap-4 text-xl">
              <button className="bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition">
                <FaBookmark />
              </button>
              <button className="bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition">
                <FaShareAlt />
              </button>
            </div>
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{data.title || "No Title"}</h1>
              <p className="text-sm sm:text-base md:text-lg mb-4">
                {data.release_date || "N/A"} • {data.original_language?.toUpperCase() || "N/A"} •{" "}
                {data.runtime || "N/A"} min
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Container for Scrollable Images */}
      <div className="my-10">
        {images && images.backdrops && images.backdrops.length > 0 && (
          <div className="container mx-auto px-4">
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
              {images.backdrops.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${item.file_path}`}
                    alt={`Backdrop ${index}`}
                    className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-5"
            >
              {images.backdrops.map((item, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${item.file_path}`}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-[80px] object-cover rounded-md hover:opacity-80 transition"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {data && (
        <div className="flex flex-col items-center bg-black text-white py-10">
          <div className="flex w-[380px] h-[56px] justify-center items-center gap-4 mb-8 rounded-xl bg-[#111111] p-1">
            <button
              className={`w-[188px] h-[52px] px-4 py-2 text-lg font-bold rounded-xl transition-all ${
                activeTab === "details"
                  ? "bg-[#1d1d1d] text-[#c61f1f]"
                  : "bg-[#111111] text-[#ffffff]"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Movie Details
            </button>
          </div>

          {activeTab === "details" && (
            <div className="w-full flex flex-col max-w-5xl items-center px-8 md:px-16 lg:px-32">
              <div className="container mx-auto px-4 py-8 bg-[#111111] text-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6">Details</h3>
                <ul className="space-y-3 text-[#A1A1A1]">
                  <li className="flex justify-between">
                    <strong>Duration:</strong>
                    <span>{`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m / ${data.runtime} minutes`}</span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Premiere:</strong>
                    <span>
                      {data.release_date
                        ? new Intl.DateTimeFormat("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(data.release_date))
                        : "N/A"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Production:</strong>
                    <span>{data.origin_country || "N/A"}</span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Genre:</strong>
                    <span>
                      {data.genres && data.genres.length > 0
                        ? data.genres.map((genre) => genre.name).join(", ")
                        : "N/A"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Director:</strong>
                    <span>Mike Mitchell, Stephanie Stein</span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Age Rating:</strong>
                    <span>6+</span>
                  </li>
                </ul>

                <div className="w-full h-[2px] mt-12 mb-12 bg-gray-600"></div>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Detail;
