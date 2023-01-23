// Creating a simple Slider img component
import "../styles/slider.css";

import { useState, useEffect } from "react";

const Slider = ({ pics, types, statsObj, delay }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((currentImg) => currentImg + 1);
    }, delay);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // If statsObj cahnges, reset the currentImg to 0
    setCurrentImg(0);
  }, [statsObj]);

  //
  useEffect(() => {
    // If the current image is greater than the length of the pics array, reset to 0
    if (currentImg > pics.length - 1) {
      setCurrentImg(0);
    }
    // If the current image is less than 0, reset to the last image in the array
    if (currentImg < 0) {
      setCurrentImg(pics.length - 1);
    }
  }, [currentImg]);

  return (
    <>
      <div className="slider__upper">
        {currentImg === 0 ? <p>Normal</p> : <p>Shiny</p>}
      </div>
      <div className={`slider bx-${types[0]}`}>
        {pics.map((pic, index) => (
          <img
            key={index}
            src={pic}
            alt="pokemon img"
            className={`${types[0]} ${
              index === currentImg ? "slider--active" : "slider--inactive"
            }`}
          />
        ))}
        <div className="slider__dots">
          {pics.map((pic, index) => (
            <span
              key={index}
              className={
                index === currentImg
                  ? "slider__dots--active"
                  : "slider__dots--inactive"
              }
              onClick={() => setCurrentImg(index)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
