import React from "react";
import Carousel from "./component/Carousel";
import { slides } from "./data/carouselData.json";

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Carousel data={slides} autoplay={true} interval={2000} />
    </div>
  );
};

export default App;
