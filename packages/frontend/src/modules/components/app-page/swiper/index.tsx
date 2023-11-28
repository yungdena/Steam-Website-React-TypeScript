import { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";
import "swiper/css/scrollbar";
import { BigImageWrapper, ImageBig, ImageContainer, ImageSmall, SwiperContainer, SwiperNavigationButton } from "./index.styled";

type ImageType = {
  images?: string[]
}

export const ImageSlider: FC<ImageType> = ({ images }) => {
  const swiperParams = {
    className: "swiper-container",
    slidesPerView: 5,
    spaceBetween: 0,
    direction: "horizontal",
    scrollbar: {
      draggable: true,
      dragSize: 69,
    },
    modules: [Scrollbar, FreeMode],
    freeMode: true,
  };
  const [selectedImage, setSelectedImage] = useState<string>(
    images && images.length > 0 ? images[0] : ""
  );

  const [nextImage, setNextImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setNextImage(image);
  };

  const handlePrevButtonClick = () => {
    const currentIndex = images?.indexOf(selectedImage) || 0;
    if (images) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images?.length - 1;
      setSelectedImage(images?.[newIndex] || "");
    }
  };

  const handleNextButtonClick = () => {
    const currentIndex = images?.indexOf(selectedImage) || 0;
    if (images) {
      const newIndex = currentIndex < images?.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(images?.[newIndex] || "");
    }
  };

  useEffect(() => {
    if (nextImage) {
      setSelectedImage(nextImage);
      setNextImage(null);
    }
  }, [nextImage]);

  return (
    <div>
      <BigImageWrapper>
        {images?.map((image, index) => (
          <ImageBig
            key={`big-image-${index}`}
            src={image}
            alt={`selected-image-${index}`}
            style={{
              opacity: image === selectedImage ? 1 : 0,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ))}
      </BigImageWrapper>
      <SwiperContainer>
        <Swiper
          style={{ paddingBottom: "20px" }}
          {...swiperParams}
        >
          {images?.map((image, index) => (
            <SwiperSlide
              className="swiper-slide"
              key={`slide-${index}`}
              onClick={() => handleImageClick(image)}
            >
              <ImageContainer selected={image === selectedImage}>
                <ImageSmall
                  src={image}
                  alt={`image-${index}`}
                  selected={image === selectedImage}
                />
              </ImageContainer>
            </SwiperSlide>
          ))}
          <SwiperNavigationButton
            className="swiper-button-prev"
            onClick={handlePrevButtonClick}
          />
          <SwiperNavigationButton
            className="swiper-button-next"
            onClick={handleNextButtonClick}
          />
        </Swiper>
      </SwiperContainer>
    </div>
  );
};

