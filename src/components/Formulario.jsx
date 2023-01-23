import React, { useState } from "react";
import Spinner from "./Spinner";
import { getPokemons } from "../data/pokemones";
import createArray from "../helpers/functions";

function Formulario({
  setLoading,
  setPokemons,
  setFilteredPokemons,
  setUniquetypes,
  setSearch,
  setType,
  setSortOrder,
  setCurrentPage,
  setPageNumbers,
  setIndexPagination,
  pokemonsPerPage,
  maxPages,
}) {
  async function getUniqueTypes(pokemons) {
    // Filtramos los tipos únicos para el selector y generamos los options
    const types = pokemons.map((pokemon) => pokemon.types);
    const arrTypes = types.flat();
    let uniqueTypes = [...new Set(arrTypes)];
    // if exists, delete 'empty'
    if (uniqueTypes.includes("empty")) {
      uniqueTypes = uniqueTypes.filter((type) => type !== "empty");
    }

    setUniquetypes(uniqueTypes);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const pokemons = await getPokemons(range);
    setLoading(false);

    // Guardamos los pokemons en el estado
    setPokemons(pokemons);
    setFilteredPokemons(pokemons);
    getUniqueTypes(pokemons);

    // Reseteamos filtros y paginación
    setSearch("");
    setType("all");
    setSortOrder("byId");

    // Reseteamos paginación
    setCurrentPage(1);
    setIndexPagination(1);
    setPageNumbers(
      createArray(pokemons.length / pokemonsPerPage).slice(0, maxPages)
    );
  }

  const handleInputChange = (event) => {
    const currentValue = event.target.value;
    setRange(currentValue);
  };
  const [range, setRange] = useState(15);

  return (
    <section className="section">
      <div className="container">
        <h1>
          Search{" "}
          <span style={{ backgroundColor: "var(--yellow)" }}>{range}</span>{" "}
          pokemons
        </h1>
        <form onSubmit={handleSubmit} className="searchForm">
          <input
            className="top-range"
            type="range"
            step="1"
            min="1"
            max="1155"
            value={range}
            onInput={handleInputChange}
          />
          <input type="submit" value="Realizar consulta" />
        </form>
      </div>
    </section>
  );
}

export default Formulario;
