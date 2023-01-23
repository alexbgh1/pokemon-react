import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Filters from "./components/Filters";
import Pokemons from "./components/Pokemons";
import Footer from "./components/Footer";
import createArray from "./helpers/functions";

import Spinner from "./components/Spinner";
import Modal from "./components/Modal";
function App() {
  const [pokemonObj, setPokemonObj] = useState({});
  const [pokemons, setPokemons] = useState([]);
  const [uniqueTypes, setUniquetypes] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favPokemons, setFavPokemons] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // Filtros
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sortOrder, setSortOrder] = useState("byId");

  // Paginación
  const maxPages = 5;
  const [pageNumbers, setPageNumbers] = useState([]);
  const [indexPagination, setIndexPagination] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);

  useEffect(() => {
    // Si no hay pokemons, no hace nada
    if (pokemons.length === 0) return;

    // Actualiza la paginación
    setPageNumbers(
      createArray(Math.ceil(filteredPokemons.length / pokemonsPerPage)).slice(
        0,
        maxPages
      )
    );
    if (filteredPokemons.length > 1) {
      setIndexPagination(1);
      setCurrentPage(1);
    } else if (filteredPokemons.length === 0) {
      setIndexPagination(0);
      setCurrentPage(0);
    }
  }, [filteredPokemons]);

  return (
    <>
      {loading && <Spinner />}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setPokemonObj={setPokemonObj}
          setLoading={setLoading}
          pokemonObj={pokemonObj}
          filteredPokemons={filteredPokemons}
        />
      )}

      <Header />
      <Formulario
        setLoading={setLoading}
        setPokemons={setPokemons}
        setFilteredPokemons={setFilteredPokemons}
        setUniquetypes={setUniquetypes}
        // Para reseatear filtros
        setSearch={setSearch}
        setType={setType}
        setSortOrder={setSortOrder}
        // Para reseatear paginación
        setCurrentPage={setCurrentPage}
        setPageNumbers={setPageNumbers}
        setIndexPagination={setIndexPagination}
        pokemonsPerPage={pokemonsPerPage}
        maxPages={maxPages}
      />
      {/* Si se hizo la consulta, muestra los valores */}
      {pokemons.length > 0 ? (
        <>
          <Filters
            pokemons={pokemons}
            uniqueTypes={uniqueTypes}
            setFilteredPokemons={setFilteredPokemons}
            search={search}
            setSearch={setSearch}
            type={type}
            pokemonsPerPage={pokemonsPerPage}
            // Filtros
            setType={setType}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            // Paginación
            setCurrentPage={setCurrentPage}
            setPokemonsPerPage={setPokemonsPerPage}
          />
          <Pokemons
            setLoading={setLoading}
            filteredPokemons={filteredPokemons}
            // Modal
            setShowModal={setShowModal}
            setPokemonObj={setPokemonObj}
            // Paginación
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pokemonsPerPage={pokemonsPerPage}
            //
            pageNumbers={pageNumbers}
            setPageNumbers={setPageNumbers}
            indexPagination={indexPagination}
            setIndexPagination={setIndexPagination}
            maxPages={maxPages}
            //
            favPokemons={favPokemons}
            setFavPokemons={setFavPokemons}
          />
        </>
      ) : (
        <h1>Load some pokemons...</h1>
      )}
      <div style={{ padding: "2rem" }}></div>
      <Footer />
    </>
  );
}

export default App;
