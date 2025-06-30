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

  const nextSlide = () => {
    if (slide >= data.length - 1) {
      setSlide(0);
      return;
    }
    setSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (slide <= 0) {
      setSlide(data.length - 1);
      return;
    }
    setSlide((prev) => prev - 1);
  };

  const handleClick = (index: number) => {
    setSlide(index);
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, data.length]);

  return (
    <div className="carousel">
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
