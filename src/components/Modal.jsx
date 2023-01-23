import { useState, useEffect, useRef } from "react";
import "../styles/modal.css";

import Slider from "./Slider";
import heightIcon from "../img/height_icon.png";
import weightIcon from "../img/weight_icon.png";

const Modal = ({
  setShowModal,
  setPokemonObj,
  setLoading,
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

  // Max stats - arbitrary
  const HP = { HP_COLOR: "#ec4541", MAX_HP: 255 };
  const ATK = { ATK_COLOR: "#f6de52", MAX_ATK: 190 };
  const DEF = { DEF_COLOR: "#ed7f0f", MAX_DEF: 230 };
  const SP_ATK = { SP_ATK_COLOR: "#56b0f1", MAX_SP_ATK: 194 };
  const SP_DEF = { SP_DEF_COLOR: "#ad62f6", MAX_SP_DEF: 230 };
  const SPEED = { SPEED_COLOR: "#f06ace", MAX_SPEED: 180 };

  // Focus modal on mount, this is for keyboard navigation "<-, ->, esc"
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Set stats color
    // iterate stats without mutating original array
    const tempStatsObj = stats.map((stat) => {
      const tempStat = { ...stat };
      switch (tempStat.name) {
        case "hp":
          tempStat.color = HP.HP_COLOR;
          tempStat.max = HP.MAX_HP;
          break;
        case "attack":
          tempStat.color = ATK.ATK_COLOR;
          tempStat.max = ATK.MAX_ATK;
          break;
        case "defense":
          tempStat.color = DEF.DEF_COLOR;
          tempStat.max = DEF.MAX_DEF;
          break;
        case "special-attack":
          tempStat.color = SP_ATK.SP_ATK_COLOR;
          tempStat.max = SP_ATK.MAX_SP_ATK;
          break;
        case "special-defense":
          tempStat.color = SP_DEF.SP_DEF_COLOR;
          tempStat.max = SP_DEF.MAX_SP_DEF;
          break;
        case "speed":
          tempStat.color = SPEED.SPEED_COLOR;
          tempStat.max = SPEED.MAX_SPEED;
          break;
        default:
          break;
      }
      return tempStat;
    });

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
    return;
  };

  const moveModal = async (key) => {
    // Get current pokemon index
    setLoading(true);

    const currentPokemonIndex = filteredPokemons.findIndex(
      (pokemon) => pokemon.id === id
    );

    // Get next pokemon index
    let nextPokemonIndex;
    switch (key) {
      case "ArrowRight":
        nextPokemonIndex = currentPokemonIndex + 1;
        break;
      case "ArrowLeft":
        nextPokemonIndex = currentPokemonIndex - 1;
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
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    // If esc key is pressed, close modal
    const actions = ["ArrowRight", "ArrowLeft", "Escape"];
    if (actions.includes(e.key)) {
      moveModal(e.key);
    }

    return;
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
    if (isLeftSwipe) {
      moveModal("ArrowRight");
    } else if (isRightSwipe) {
      moveModal("ArrowLeft");
    }

    // Reset touch start and end
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      <div
        className="bg__modal"
        onClick={(e) => handleOnClick(e)}
        onKeyDownCapture={(e) => handleKeyDown(e)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex="0"
        ref={modalRef}
      >
        <div className="modal">
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
            <span>&lt;</span>
          </div>
          <div
            className="modal__rightarrow"
            onClick={() => moveModal("ArrowRight")}
          >
            <span>&gt; </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
