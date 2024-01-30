import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselComponentVideoView = ({ videos }) => {
  const carouselItems = videos.map((video) => (
    <div key={video.id}>
      <video
        src={import.meta.env.VITE_BACKEND_URL + video.video}
        alt={`image ${video.id}`}
        className="w-64 h-64 object-cover rounded"
        controls
      />
    </div>
  ));

  return (
    <Carousel
      className="w-64 h-64"
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      transitionTime={1000}
      showArrows={true}
      showIndicators={true}
    >
      {carouselItems}
    </Carousel>
  );
};

export default CarouselComponentVideoView;
