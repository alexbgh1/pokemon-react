import { useEffect, useState } from "react";

function Filters({
  pokemons,
  uniqueTypes,
  setFilteredPokemons,
  search,
  setSearch,
  type,
  pokemonsPerPage,
  setType,
  sortOrder,
  setSortOrder,
  setCurrentPage,
  setPokemonsPerPage,
}) {
  const handleFilters = (e) => {
    // if e.target.id is equal to input, set it
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case "search":
        setSearch(value);
        break;
      case "type":
        setType(value);
        break;
      case "sort_order":
        setSortOrder(value);
        break;
      case "pokemons_per_page":
        setPokemonsPerPage(parseInt(value));
    }
  };

  useEffect(() => {
    // If all filters are empty then return all
    if (search === "" && type === "all" && sortOrder === "byIdASC") {
      setFilteredPokemons(pokemons);
      return;
    }

    let filteredPokemons = pokemons;

    // Sort by type & name
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.name.includes(search.toLowerCase())
    );
    if (type !== "all") {
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.types.includes(type)
      );
    }

    // Sort by weight

    switch (sortOrder) {
      case "byWeightASC":
        filteredPokemons = filteredPokemons.sort((a, b) => a.weight - b.weight);
        break;
      case "byWeightDESC":
        filteredPokemons = filteredPokemons.sort((a, b) => b.weight - a.weight);
        break;
      case "byHeightASC":
        filteredPokemons = filteredPokemons.sort((a, b) => a.height - b.height);
        break;
      case "byHeightDESC":
        filteredPokemons = filteredPokemons.sort((a, b) => b.height - a.height);
        break;
      default:
        break;
    }

    setFilteredPokemons(filteredPokemons);

    // Reset page to 1
    setCurrentPage(1);
  }, [search, type, sortOrder, pokemonsPerPage]);

  return (
    <div className="filters">
      <div>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          id="search"
          onInput={handleFilters}
          value={search}
        />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <select name="type" id="type" onInput={handleFilters} value={type}>
          <option key="all" value="all">
            all
          </option>
          {/* generamos option de forma dinámica */}
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort_order">Sort by weight</label>
        <select
          name="sort_order"
          id="sort_order"
          onChange={handleFilters}
          value={sortOrder}
        >
          <option value="byIdASC">Default (id)</option>
          <option value="byWeightASC">Weight Asc</option>
          <option value="byWeightDESC">Weight Desc</option>
          <option value="byHeightASC">Height Asc</option>
          <option value="byHeightDESC">Height Desc</option>
        </select>
      </div>
      <div>
        <label htmlFor="pokemons_per_page">Show pokemons</label>
        <select
          name="pokemons_per_page"
          id="pokemons_per_page"
          onChange={handleFilters}
          value={pokemonsPerPage}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
