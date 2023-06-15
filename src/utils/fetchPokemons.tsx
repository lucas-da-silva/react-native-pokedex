import IPokemon from '../interfaces/IPokemon'

const URL = 'https://pokeapi.co/api/v2/pokemon'

type ResponsePokemon = {
  results: {
    url: string
  }[]
}

async function fetchPokemonsDetails(url: string): Promise<IPokemon> {
  const response = await fetch(url)
  const json = await response.json() as IPokemon
  return json
}

async function fetchPokemons(limit = 100, offset = 0): Promise<IPokemon[]> {
  const url = `${URL}?limit=${limit}&offset=${offset}`
  const response = await fetch(url)
  const json = await response.json() as ResponsePokemon
  const pokemons = await Promise.all(
    json.results.map(async (pokemon) => fetchPokemonsDetails(pokemon.url)),
  )
  return pokemons
}

export default fetchPokemons
