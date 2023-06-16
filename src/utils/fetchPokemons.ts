import { IPokemonCard, IPokemonDetails } from '../interfaces/Pokemon'

const URL = 'https://pokeapi.co/api/v2/pokemon'

type ResponsePokemon = {
  results: {
    url: string
  }[]
}

function formatPokemon(pokemon: IPokemonDetails) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    uri: pokemon.sprites.other['official-artwork'].front_default,
  }
}

async function fetchPokemonsDetails(url: string): Promise<IPokemonCard> {
  const response = await fetch(url)
  const json = await response.json() as IPokemonDetails
  return formatPokemon(json)
}

async function fetchPokemons(limit = 100, offset = 0): Promise<IPokemonCard[]> {
  const url = `${URL}?limit=${limit}&offset=${offset}`
  const response = await fetch(url)
  const json = await response.json() as ResponsePokemon
  const pokemons = await Promise.all(
    json.results.map(async (pokemon) => fetchPokemonsDetails(pokemon.url)),
  )
  return pokemons
}

export default fetchPokemons
