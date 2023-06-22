import type { IPokemonCard, IPokemonDetails, IPokemonDetailsCard } from '../interfaces'

export const formatPokemonCard = (pokemon: IPokemonDetails): IPokemonCard => ({
  id: pokemon.id,
  name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
  uri: pokemon.sprites.other['official-artwork'].front_default,
  types: pokemon.types.map(({ type }) => type.name),
})

export const formatPokemonDetailsCard = (
  pokemon: IPokemonDetails,
): IPokemonDetailsCard => ({
  ...formatPokemonCard(pokemon),
  abilities: pokemon.abilities.map(({ name }) => name),
})
