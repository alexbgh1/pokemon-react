import not_found from "../img/pokemon_not_found.png";

// GET -limit- pokemons from API
export async function getPokemons(limit = 15, offset = 0) {
  // Max: 1154
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/pokemon?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = transformPokemons(await response.json());

  return data;
}

async function transformPokemons(pokemons) {
  const pokemonsArr = await Promise.all(
    pokemons.results.map(async (pokemon) => {
      // Almacenar ID
      const pokeArr = pokemon.url.split("/");
      const id = pokeArr[6];

      // mini fetch: Información del pokemon
      const response_pokemon = await fetch(pokemon.url);
      const info_pokemon = await response_pokemon.json();

      // Stats as object
      const stats = info_pokemon.stats.map((stat) => {
        return {
          name: stat.stat.name,
          value: stat.base_stat,
        };
      });

      // Peso y altura
      const weight = info_pokemon.weight;
      const height = info_pokemon.height;

      // Imagenes
      const pic = info_pokemon.sprites.front_default || not_found;
      const pic_shiny = info_pokemon.sprites.front_shiny || not_found;
      const pics = [pic, pic_shiny];

      // Tipos
      const types = info_pokemon.types.map((type) => type.type.name);

      // Si tinee un solo tipo, agregar "empty"
      types.length < 2 && types.push("empty");

      return {
        id,
        pics,
        name: pokemon.name,
        weight,
        height,
        types,
        stats,
      };
    })
  );
  return pokemonsArr;
}
