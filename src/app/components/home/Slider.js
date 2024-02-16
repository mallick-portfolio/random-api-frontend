import React from "react";
import banner1 from "@../../../public/image/banner-2.jpg";
import banner2 from "@../../../public/image/banner-3.jpg";
import Image from "next/image";

const Slider = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <Image height={1500} src={banner1} className="w-full min-h-[500px]" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <Image height={1500} src={banner2} className="w-full min-h-[500px]" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
