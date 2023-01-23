import React, { Suspense, useState } from "react";
const PokemonLazy = React.lazy(() => import("./Pokemon"));
import Pagination from "./Pagination";

function Pokemons({
  setLoading,
  filteredPokemons,
  setShowModal,
  setPokemonObj,
  currentPage,
  setCurrentPage,
  pokemonsPerPage,
  pageNumbers,
  setPageNumbers,
  indexPagination,
  setIndexPagination,
  maxPages,
}) {
  // Creamos paginación

  // Obtenemos los pokemons actuales
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return (
    <>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pokemonsPerPage={pokemonsPerPage}
        totalPokemons={filteredPokemons.length}
        pageNumbers={pageNumbers}
        setPageNumbers={setPageNumbers}
        indexPagination={indexPagination}
        setIndexPagination={setIndexPagination}
        maxPages={maxPages}
      />
      <main className="main">
        <Suspense fallback={<div>Loading...</div>}>
          {currentPokemons.map((pokemon) => (
            <PokemonLazy
              key={pokemon.id}
              pokemon={pokemon}
              setLoading={setLoading}
              setShowModal={setShowModal}
              setPokemonObj={setPokemonObj}
            />
          ))}
        </Suspense>
      </main>

      {/* Creamos paginación, si hay 0 paginas, este no lo muestra */}
      {pageNumbers.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pokemonsPerPage={pokemonsPerPage}
          totalPokemons={filteredPokemons.length}
          pageNumbers={pageNumbers}
          setPageNumbers={setPageNumbers}
          indexPagination={indexPagination}
          setIndexPagination={setIndexPagination}
          maxPages={maxPages}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Pokemons;
