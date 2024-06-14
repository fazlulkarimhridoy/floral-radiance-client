import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Carousel } from 'antd';
interface CarouselProps {
  images: string[];
}

const Banner: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentIndex, images.length, goToNext]);

  return (
    <div className="carousel w-full h-[250px] border-2 p-4 relative rounded-2xl ">
      <div className="carousel-track">
        <img
          src={images[currentIndex]}
          alt="carousel"
          className="carousel-image w-[300px] h-[200px] object-cover"
        />
      </div>

      <div className="carousel-button">
        <button onClick={goToPrevious} className=" left">
          <FaAngleLeft />
        </button>
        <p>
          {currentIndex + 1} / {images.length}
        </p>
        <button onClick={goToNext} className=" right">
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
