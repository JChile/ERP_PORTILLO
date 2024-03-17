import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const CarouselComponentImageView = ({ images }) => {
  const carouselItems = images.map((imagen) => (
    <div key={imagen.id}>
      <img
        src={import.meta.env.VITE_BACKEND_URL + imagen.imagen}
        alt={`image ${imagen.id}`}
        className="w-64 h-64"
      />
    </div>
  ))

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
  )
}

export default CarouselComponentImageView
