import React, { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.min.css";
import { ImageBig, ImageSmall } from "./index.styled";

type ImageType = {
  images?: string[]
}

export const ImageSlider: FC<ImageType> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string>(
      images && images.length > 0 ? images[0] : ""
    );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    if (images) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <div>
      <div className="selected-image-container">
        <ImageBig src={selectedImage} alt="selected-image" />
      </div>
      <Swiper
        className="swiper-container"
        slidesPerView={5}
        spaceBetween={0}
        direction="horizontal"
      >
        {images?.map((image, index) => (
          <SwiperSlide
            className="swiper-slide"
            key={index}
            onClick={() => handleImageClick(image)}
          >
            <ImageSmall src={image} alt={`image-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

