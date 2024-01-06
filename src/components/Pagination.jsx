import { useEffect } from "react";
import { createArray } from "../helpers/functions";

function Pagination({
  currentPage,
  setCurrentPage,
  pokemonsPerPage,
  totalPokemons,
  pageNumbers,
  setPageNumbers,
  indexPagination,
  setIndexPagination,
  maxPages,
}) {
  // Creamos paginación Numérica
  // const maxPages = 5;
  const totalPages = createArray(Math.ceil(totalPokemons / pokemonsPerPage));
  // const [indexPagination, setIndexPagination] = useState(1);
  // const [pageNumbers, setPageNumbers] = useState(totalPages.slice(0, maxPages));

  // La primera vez que se renderiza el componente, se ejecuta el useEffect
  useEffect(() => {
    setPageNumbers(totalPages.slice(0, maxPages));
  }, []);

  const handleNumberingPagination = (e) => {
    switch (e.target.id) {
      case "prev-5":
        if (indexPagination > 1) {
          setIndexPagination(indexPagination - 1);
          setPageNumbers(
            totalPages.slice(
              (indexPagination - 2) * maxPages,
              (indexPagination - 1) * maxPages
            )
          );
        }
        break;
      case "prev-1":
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
          if (currentPage === pageNumbers[0]) {
            setIndexPagination(indexPagination - 1);
            setPageNumbers(
              totalPages.slice(
                (indexPagination - 2) * maxPages,
                (indexPagination - 1) * maxPages
              )
            );
          }
        }
        break;
      case "next-1":
        if (currentPage < Math.ceil(totalPokemons / pokemonsPerPage)) {
          setCurrentPage(currentPage + 1);
          if (currentPage === pageNumbers[maxPages - 1]) {
            setIndexPagination(indexPagination + 1);
            setPageNumbers(
              totalPages.slice(
                indexPagination * maxPages,
                (indexPagination + 1) * maxPages
              )
            );
          }
        }
        break;
      case "next-5":
        if (indexPagination < Math.ceil(totalPages.length / maxPages)) {
          setIndexPagination(indexPagination + 1);
          setPageNumbers(
            totalPages.slice(
              indexPagination * maxPages,
              (indexPagination + 1) * maxPages
            )
          );
        }
        break;
    }
  };

  return (
    <div className="pagination">
      {/* Current Page */}
      <div className="numeration">
        <table>
          <tbody>
            <tr>
              <td className="prev">
                <button
                  id="prev-5"
                  onClick={handleNumberingPagination}
                  disabled={indexPagination <= 1}
                >
                  Show 5 {"<"}
                </button>
                <button
                  id="prev-1"
                  onClick={handleNumberingPagination}
                  disabled={currentPage <= 1}
                >
                  Prev
                </button>
              </td>
              {pageNumbers.map((number) => (
                <td key={number}>
                  <button
                    onClick={() => setCurrentPage(number)}
                    disabled={currentPage === number}
                  >
                    {number}
                  </button>
                </td>
              ))}
              <td className="next">
                <button
                  id="next-1"
                  onClick={handleNumberingPagination}
                  disabled={
                    currentPage === Math.ceil(totalPokemons / pokemonsPerPage)
                  }
                >
                  Next
                </button>
                <button
                  id="next-5"
                  onClick={handleNumberingPagination}
                  disabled={
                    currentPage >= totalPages.length - maxPages + 1 ||
                    totalPages.length <= maxPages
                  }
                >
                  Show 5 {">"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          page: {currentPage} of {Math.ceil(totalPokemons / pokemonsPerPage)}
        </p>
      </div>
    </div>
  );
}

export default Pagination;
