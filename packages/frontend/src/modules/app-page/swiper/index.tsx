import React, { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.min.css";
import { ImageBig, ImageSmall, SwiperContainer } from "./index.styled";

type ImageType = {
  images?: string[]
}

export const ImageSlider: FC<ImageType> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string>(
      images && images.length > 0 ? images[0] : ""
    );
    const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImageLoaded(false);
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
        <CSSTransition
          in={true}
          timeout={300}
          classNames="fade"
          key={selectedImage}
          unmountOnExit
        >
          <ImageBig
            src={selectedImage}
            alt="selected-image"
            onLoad={() => setSelectedImageLoaded(true)}
            style={{ opacity: selectedImage ? 1 : 0 }}
          />
        </CSSTransition>
      </div>
      <SwiperContainer>
        <Swiper
          className="swiper-container"
          slidesPerView={5}
          spaceBetween={0}
          direction="horizontal"
        >
          {images?.map((image, index) => (
            <SwiperSlide
              className="swiper-slide"
              key={`slide-${index}`}
              onClick={() => handleImageClick(image)}
            >
              <ImageSmall
                src={image}
                alt={`image-${index}`}
                selected={image === selectedImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </div>
  );
};

