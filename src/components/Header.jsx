import React from "react";
import LogoPokemon from "../img/pokemon_logo.png";

function Header() {
  return (
    <header className="header">
      <a href="#">
        <img src={LogoPokemon} width="150px" height="55px" alt="logo pokemon" />
      </a>

      <nav className="navegacion">
        <ul>
          <li>
            <a href="#" className={location?.pathname === "/" ? "active" : ""}>
              Home
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
