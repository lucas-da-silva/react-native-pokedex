import type { IPokemonCard, IPokemonDetails, IPokemonDetailsCard } from '../interfaces'
import { formatPokemonCard, formatPokemonDetailsCard } from './formatPokemon'

const URL = 'https://pokeapi.co/api/v2/pokemon'

type ResponsePokemon = {
  results: {
    url: string
  }[]
}

async function fetchPokemonsDetails(url: string): Promise<IPokemonCard> {
  const response = await fetch(url)
  const json = await response.json() as IPokemonDetails
  return formatPokemonCard(json)
}

export async function fetchPokemons(limit = 100, offset = 0): Promise<IPokemonCard[]> {
  const url = `${URL}?limit=${limit}&offset=${offset}`
  const response = await fetch(url)
  const json = await response.json() as ResponsePokemon
  const pokemons = await Promise.all(
    json.results.map(async (pokemon) => fetchPokemonsDetails(pokemon.url)),
  )
  return pokemons
}

export async function fetchPokemonById(id: number): Promise<IPokemonDetailsCard> {
  const response = await fetch(`${URL}/${id}`)
  const json = await response.json() as IPokemonDetails
  return formatPokemonDetailsCard(json)
}
