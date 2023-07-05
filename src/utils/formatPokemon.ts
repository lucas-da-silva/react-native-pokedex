import type {
  IPokemonCard,
  IPokemonDetailsCard,
  IPokemonDetailsSpecie,
  IPokemonSpecieFlavorText,
} from '../interfaces'

const capitalizeFirstLetter = (
  field: { name: string },
): string => field.name.charAt(0).toUpperCase() + field.name.slice(1)

const cleanDescriptionText = (
  text: string,
  namePokemon: string,
) => {
  const nameRegex = new RegExp(`\\b${namePokemon}\\b`, 'gi')
  const capitalizedPokemonName = capitalizeFirstLetter({ name: namePokemon })

  return text.replace(/[\r\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/POKéMON/ig, 'Pokémon')
    .replace(nameRegex, capitalizedPokemonName)
    .trim()
}

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
  const {
    stats,
    flavor_text_entries: flavorTexts,
  } = pokemon

  const descriptions = flavorTexts.filter(
    ({ language }) => language.name === 'en',
  ) as IPokemonSpecieFlavorText[]
  const randomIndex = Math.floor(Math.random() * descriptions.length)
  const description = descriptions[randomIndex]

  const formattedStats = {
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    specialAttack: stats[3].base_stat,
    specialDefense: stats[4].base_stat,
    speed: stats[5].base_stat,
    total: stats.reduce((sum, stat) => sum + stat.base_stat, 0),
  }

  return {
    ...formatPokemonCard(pokemon),
    abilities: pokemon.abilities.map(({ ability }) => capitalizeFirstLetter(ability)),
    weight: pokemon.weight / 10,
    height: pokemon.height,
    description: cleanDescriptionText(description.flavor_text, pokemon.name),
    habitat: capitalizeFirstLetter(pokemon.habitat),
    version: capitalizeFirstLetter(description.version),
    stats: formattedStats,
  }
}

export const formatPokemonID = (id: number): string => id.toString().padStart(3, '0')
