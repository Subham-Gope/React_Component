import React, { useEffect, useState } from "react";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";

interface slides {
  src: string;
  alt: string;
}

interface PropTypes {
  data: slides[];
  autoplay?: boolean;
  interval?: number;
}

const Carousel: React.FC<PropTypes> = ({
  data,
  autoplay = false,
  interval = 3000,
}) => {
  const [slide, setSlide] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide == data.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setSlide((prevSlide) => (prevSlide == 0 ? data.length - 1 : prevSlide - 1));
  };

  const handleClick = (index: number) => {
    setSlide(index);
  };

  useEffect(() => {
    if (!paused) {
      if (!autoplay) return;

      const timer = setInterval(() => {
        setSlide((prevSlide) =>
          prevSlide == data.length - 1 ? 0 : prevSlide + 1
        );
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoplay, interval, data.length, paused]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => {
        setPaused(true);
      }}
      onMouseLeave={() => {
        setPaused(false);
      }}
    >
      <CircleArrowLeft className="arrow arrow-left" onClick={prevSlide} />
      {data.map((item, index) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={index}
            className={slide === index ? "slide" : "slide slide-hidden"}
          ></img>
        );
      })}
      <CircleArrowRight className="arrow arrow-right" onClick={nextSlide} />
      <span className="indicators">
        {data.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={
                slide == index ? "indicator" : "indicator indicator-inactive"
              }
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;
