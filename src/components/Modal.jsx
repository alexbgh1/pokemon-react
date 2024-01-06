import { useState, useEffect, useRef } from "react";
import "../styles/modal.css";

import Slider from "./Slider";
import heightIcon from "../img/height_icon.png";
import weightIcon from "../img/weight_icon.png";

import { mapTemporaryStats } from "../helpers/functions";

const Modal = ({
  setShowModal,
  setPokemonObj,
  pokemonObj,
  filteredPokemons,
}) => {
  const { id, pics, name, stats, weight, height, types } = pokemonObj;
  const [statsObj, setStatsObj] = useState([]);

  // Touch events for mobile swipe navigation
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Ref for modal - Allows for keyboard navigation
  const modalRef = useRef();

  // Animation
  const [animationClass, setAnimationClass] = useState("");

  // Focus modal on mount, this is for keyboard navigation "<-, ->, esc"
  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();
  }, []);

  useEffect(() => {
    // Set stats color
    // iterate stats without mutating original array
    const tempStatsObj = mapTemporaryStats(stats);

    setStatsObj(tempStatsObj);
  }, [stats]);

  const handleOnClick = (e) => {
    // If contains bg__modal or modal__header__close, close modal
    // This is the equivalent to clicking outside the modal or clicking the close button
    const modalClass = e.target.classList;
    if (
      modalClass.contains("bg__modal") ||
      modalClass.contains("modal__header__close")
    ) {
      setShowModal(false);
    }
  };

  const moveModal = async (key) => {
    // Get current pokemon index
    const currentPokemonIndex = filteredPokemons.findIndex(
      (pokemon) => pokemon.id === id
    );

    // Get next pokemon index
    let nextPokemonIndex;
    switch (key) {
      case "ArrowRight":
        nextPokemonIndex = currentPokemonIndex + 1;
        setAnimationClass("slideInRight");
        break;
      case "ArrowLeft":
        nextPokemonIndex = currentPokemonIndex - 1;
        setAnimationClass("slideInLeft");
        break;
      case "Escape":
        setShowModal(false);
        break;
      default:
        break;
    }

    // If next pokemon index is out of bounds, set to first or last pokemon
    if (nextPokemonIndex < 0) {
      nextPokemonIndex = filteredPokemons.length - 1;
    }
    if (nextPokemonIndex > filteredPokemons.length - 1) {
      nextPokemonIndex = 0;
    }

    // Set next pokemon
    const nextPokemon = filteredPokemons[nextPokemonIndex];
    setPokemonObj(nextPokemon);
  };

  const handleKeyDown = (e) => {
    // If esc key is pressed, close modal
    const actions = ["ArrowRight", "ArrowLeft", "Escape"];
    if (actions.includes(e.key)) {
      moveModal(e.key);
    }
  };

  const handleTouchStart = (e) => {
    // Get touch start position
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // add your conditional logic here
    if (isLeftSwipe) moveModal("ArrowRight");
    else if (isRightSwipe) moveModal("ArrowLeft");

    // Reset touch start and end
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      <div
        className="bg__modal"
        onClick={handleOnClick}
        onKeyDownCapture={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex="0"
        ref={modalRef}
      >
        <div key={id} className={`modal ${animationClass}`}>
          <div className="modal__content">
            <div className="modal__header">
              <h2>{name}</h2>
              <span
                className="modal__header__close"
                onClick={(e) => handleOnClick(e)}
              >
                &times;
              </span>
              <span className="modal__header__id">id: {id}</span>
            </div>
            <div className="modal__body">
              <Slider
                pics={pics}
                types={types}
                statsObj={statsObj}
                delay={5000}
              />
              <div className="modal__body__stats">
                <h3>Stats</h3>
                <ul>
                  {statsObj.map((stat, index) => (
                    <li key={index}>
                      {stat.name}: {stat.value}
                      <div
                        className="modal__body__stats__bar"
                        style={{
                          width: "100%",
                          backgroundColor: `${stat.color}60`,
                          boxShadow: `inset 0 0 0 1px ${stat.color}80`,
                        }}
                      >
                        <div
                          className="modal__body__stats__bar"
                          style={{
                            width: `${(stat.value / stat.max) * 100}%`,
                            backgroundColor: `${stat.color}d0`,
                          }}
                        ></div>
                        <span>{stat.max}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal__body__types">
                <h3>Types</h3>
                <ul>
                  {types.map((type, index) =>
                    type === "empty" ? null : (
                      <li key={index}>
                        <div className={`block ${type}`}></div>
                        <span>{type}</span>
                      </li>
                    )
                  )}
                </ul>
                <h3>Weight & Height</h3>

                <ul>
                  <li>
                    <img src={weightIcon} width="25px" height="25px" />
                    <span>{weight / 10} kg</span>
                  </li>
                  <li>
                    <img src={heightIcon} width="25px" height="25px" />
                    <span>{height / 10} m</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="modal__leftarrow"
            onClick={() => moveModal("ArrowLeft")}
          >
            <span style={{ fontSize: "24px" }}>←</span>
          </div>
          <div
            className="modal__rightarrow"
            onClick={() => moveModal("ArrowRight")}
          >
            <span style={{ fontSize: "24px" }}>→</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
