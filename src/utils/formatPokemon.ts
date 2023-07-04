import type {
  IPokemonCard,
  IPokemonDetailsCard,
  IPokemonDetailsSpecie,
  IPokemonSpecieFlavorText,
} from '../interfaces'

const capitalizeFirstLetter = (
  field: { name: string },
): string => field.name.charAt(0).toUpperCase() + field.name.slice(1)

const cleanDescriptionText = (text: string) => text.replace(/[\r\n]/g, ' ')
  .replace(/\s+/g, ' ')
  .replace(/POKéMON/ig, 'Pokémon')
  .trim()

export const formatPokemonCard = (
  pokemon: IPokemonDetailsSpecie,
): IPokemonCard => ({
  id: pokemon.id,
  name: capitalizeFirstLetter(pokemon),
  uri: pokemon.sprites.other['official-artwork'].front_default,
  types: pokemon.types.map(({ type }) => type.name),
  color: pokemon.types[0].type.name,
})

export const formatPokemonDetailsCard = (
  pokemon: IPokemonDetailsSpecie,
): IPokemonDetailsCard => {
  const description = pokemon.flavor_text_entries.find(
    ({ language }) => language.name === 'en',
  ) as IPokemonSpecieFlavorText

  return {
    ...formatPokemonCard(pokemon),
    abilities: pokemon.abilities.map(({ ability }) => capitalizeFirstLetter(ability)),
    weight: pokemon.weight / 10,
    height: pokemon.height,
    description: cleanDescriptionText(description.flavor_text),
    habitat: capitalizeFirstLetter(pokemon.habitat),
  }
}

export const formatPokemonID = (id: number): string => id.toString().padStart(3, '0')
