"use client";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "@../../../public/image/kanban3.jpg";
import banner2 from "@../../../public/image/kanban2.jpg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const Slider = () => {
  return (
    <div className="relative">
      <Swiper
        autoplay={{ delay: 5000 }}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        loop={true}
        pagination={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="relative after:absolute after:left-0 after:top-0 after:bottom-0 z-10 after:right-0 after:bg-menu"
            style={{
              background: `url(${banner1.src})`,
              backgroundSize: "cover",
              padding: "80px 0",
            }}
          >
            <div className="container relative z-20 flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 pr-8 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  Navigating Tasks <br />{" "}
                  <span className="text-primary">Soaring</span> Through
                  Productivity
                </h1>
                <h5 className="text-xl md:text-2xl mt-8">
                  Rev Up Your Efficiency: Find Solitude and Clarity on Your Task
                  Journey
                </h5>
                <Link
                  href={"/account/register"}
                  className="mt-5 btn btn-primary"
                  color="primary"
                  variant="shadow"
                >
                  Start Now
                </Link>
              </div>
              {/* <div className="w-full md:w-1/2 px-8">
                <Image src={coocker1} alt="" />
              </div> */}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative after:absolute after:left-0 after:top-0 after:bottom-0 z-10 after:right-0 after:bg-menu"
            style={{
              background: `url(${banner2.src})`,
              backgroundSize: "cover",
              padding: "80px 0",
            }}
          >
            <div className="container relative z-20 flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 pr-8 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  Task Board <br /> <span className="text-primary">Riding</span>{" "}
                  the Winds of Efficiency
                </h1>
                <h5 className="text-xl md:text-2xl mt-8">
                  Your Personal Highway to Productivity: Escape the Noise and
                  Focus
                </h5>
                <Link
                  href={"/account/register"}
                  className="mt-5 btn btn-primary"
                  color="primary"
                  variant="shadow"
                >
                  Start Now
                </Link>
              </div>
              {/* <div className="w-full md:w-1/2 px-8">
                <Image src={coocker1} alt="" />
              </div> */}
            </div>
          </div>
        </SwiperSlide>

        <div className="text-center text-primary sm:flex justify-center items-center text-xl sm:text-2xl absolute top-1/2 left-4 -translate-y-1/2 z-30 rounded-full w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-2 border-primary cursor-pointer hover:ring hover:ring-offset-2 duration-500 ring-primary prev">
          <IoIosArrowBack />
        </div>
        <div className=" text-center text-primary sm:flex justify-center items-center text-xl sm:text-2xl absolute top-1/2 right-4 -translate-y-1/2 z-30 rounded-full w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-2 border-primary cursor-pointer hover:ring hover:ring-offset-2 duration-500 ring-primary next">
          <IoIosArrowForward />
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
