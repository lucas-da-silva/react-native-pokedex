import type { IPokemonCard, IPokemonDetails, IPokemonDetailsCard } from '../interfaces'

const capitalizeFirstLetter = (
  field: { name: string },
): string => field.name.charAt(0).toUpperCase() + field.name.slice(1)

export const formatPokemonCard = (pokemon: IPokemonDetails): IPokemonCard => ({
  id: pokemon.id,
  name: capitalizeFirstLetter(pokemon),
  uri: pokemon.sprites.other['official-artwork'].front_default,
  types: pokemon.types.map(({ type }) => type.name),
})

export const formatPokemonDetailsCard = (
  pokemon: IPokemonDetails,
): IPokemonDetailsCard => ({
  ...formatPokemonCard(pokemon),
  abilities: pokemon.abilities.map(({ ability }) => capitalizeFirstLetter(ability)),
  weight: pokemon.weight / 10,
  height: pokemon.height,
})

export const formatPokemonID = (id: number): string => id.toString().padStart(3, '0')
