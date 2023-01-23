import { useState } from "react";

import ".././styles/types.css";
import heightIcon from "../img/height_icon.png";
import weightIcon from "../img/weight_icon.png";

function Pokemon({ setLoading, pokemon, setShowModal, setPokemonObj }) {
  const { id, pics, name, weight, height, types } = pokemon;
  const [option, setOption] = useState("normal");

  async function handleSelect(e) {
    setLoading(true);
    setOption(e.target.value);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
  }

  function handleModal() {
    setPokemonObj(pokemon);
    setShowModal(true);
  }

  return (
    <article className={`${types[0]}`}>
      <img
        loading="lazy"
        width="96px"
        height="96px"
        src={option === "normal" ? pics[0] : pics[1]}
        alt={`pokemon ${name}`}
        className={`${types[0]} bx-${types[0]}`}
      />
      <div>
        <div className={`block ${types[0]}`}></div>
        <div className={`block ${types[1]}`}></div>
      </div>

      <h3>
        {pokemon.name}{" "}
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleModal}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.53846C7.32682 3.53846 3.53846 7.32682 3.53846 12C3.53846 16.6732 7.32682 20.4615 12 20.4615C16.6732 20.4615 20.4615 16.6732 20.4615 12C20.4615 7.32682 16.6732 3.53846 12 3.53846ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
            fill="#030D45"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 16.359C12.4248 16.359 12.7692 16.0146 12.7692 15.5897V11.4872C12.7692 11.0623 12.4248 10.7179 12 10.7179C11.5752 10.7179 11.2308 11.0623 11.2308 11.4872V15.5897C11.2308 16.0146 11.5752 16.359 12 16.359Z"
            fill="#030D45"
          />
          <path
            d="M13.0256 8.41026C13.0256 7.84381 12.5664 7.38462 12 7.38462C11.4336 7.38462 10.9744 7.84381 10.9744 8.41026C10.9744 8.9767 11.4336 9.4359 12 9.4359C12.5664 9.4359 13.0256 8.9767 13.0256 8.41026Z"
            fill="#030D45"
          />
        </svg>
      </h3>
      <p className="pokemon_id">id: {id}</p>

      <div className={`pokemon_generalinfo bg-linear-${types[0]}`}>
        <div>
          <img src={weightIcon} width="25px" height="25px" />
          <span>{weight / 10} kg</span>
        </div>
        <div>
          <img src={heightIcon} width="25px" height="25px" />
          <span>{height / 10} m</span>
        </div>
      </div>
      <select className="pokemon_selector" name="types" onChange={handleSelect}>
        <option value="normal" defaultValue>
          normal
        </option>
        <option value="shiny">shiny</option>
      </select>
    </article>
  );
}

export default Pokemon;
