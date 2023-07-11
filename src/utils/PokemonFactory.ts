import {
  IPokemonCard,
  IPokemonDetails,
  IPokemonDetailsCard,
  IPokemonSpecieFlavorText,
  IPokemonFormattedStats,
  IPokemonStats,
  IEvolution,
  IPokemonDetailsEvolution,
  IPokemonSpecie,
} from '../interfaces'
import { ITypesPokemons } from './TypesPokemons'

type TriggerMap = {
  [key: string]: string;
};

class PokemonFactory {
  private capitalizeFirstLetter(field: { name: string }): string {
    return field.name.charAt(0).toUpperCase() + field.name.slice(1)
  }

  private cleanDescription(text: string, namePokemon: string): string {
    const nameRegex = new RegExp(`\\b${namePokemon}\\b`, 'gi')
    const capitalizedPokemonName = this.capitalizeFirstLetter({ name: namePokemon })

    return text
      .replace(/[\r\n]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/POKéMON/ig, 'Pokémon')
      .replace(nameRegex, capitalizedPokemonName)
      .trim()
  }

  private getStats(stats: IPokemonStats[]): IPokemonFormattedStats {
    return {
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      specialAttack: stats[3].base_stat,
      specialDefense: stats[4].base_stat,
      speed: stats[5].base_stat,
      total: stats.reduce((sum, stat) => sum + stat.base_stat, 0),
    }
  }

  private getDescription(
    flavorTexts: IPokemonSpecieFlavorText[],
  ): IPokemonSpecieFlavorText {
    const descriptions = flavorTexts.filter(({ language }) => language.name === 'en')
    const randomIndex = Math.floor(Math.random() * descriptions.length)
    return descriptions[randomIndex]
  }

  private getImage(pokemon: IPokemonDetails): string {
    return pokemon.sprites.other['official-artwork'].front_default
  }

  private getTypes(pokemon: IPokemonDetails): ITypesPokemons[] {
    return pokemon.types.map(({ type }) => type.name)
  }

  public PokemonID(id: number): string {
    return id.toString().padStart(3, '0')
  }

  public getTrigger(trigger: string): string {
    const triggers: TriggerMap = {
      'level-up': 'Level',
      trade: 'Trade',
      'use-item': 'Use Item',
      shed: 'Shed',
      spin: 'spin',
      'tower-of-darkness': 'Tower of Darkness',
      'tower-of-waters': 'Tower of Waters',
      'three-critical-hits': 'three-critical-hits',
      'take-damage': 'take-damage',
      other: 'Other',
      'agile-style-move': 'agile-style-move',
      'strong-style-move': 'strong-style-move',
      'recoil-damage': 'recoil-damage',
    }

    return triggers[trigger]
  }

  public EvolutionCard(
    pokemon: IPokemonDetails,
    { evolution_details: evolutionDetails }: IEvolution,
  ): IPokemonDetailsEvolution {
    const types = this.getTypes(pokemon)
    const formattedEvolution = {
      id: pokemon.id,
      name: this.capitalizeFirstLetter(pokemon),
      image: this.getImage(pokemon),
      types,
      color: types[0],
      evolutions: [],
      minLevel: 0,
      trigger: '',
    }

    if (evolutionDetails[0]) {
      formattedEvolution.trigger = this.getTrigger(
        evolutionDetails[0].trigger.name,
      )
      formattedEvolution.minLevel = evolutionDetails[0].min_level
    }

    return formattedEvolution
  }

  public PokemonCard(pokemon: IPokemonDetails | undefined): IPokemonCard | object {
    if (!pokemon) return {}

    return {
      id: pokemon.id,
      name: this.capitalizeFirstLetter(pokemon),
      uri: this.getImage(pokemon),
      types: this.getTypes(pokemon),
      color: pokemon.types[0].type.name,
    }
  }

  public PokemonDetailsCard(
    pokemon: IPokemonDetails,
    pokemonSpecie: IPokemonSpecie,
    evolution: IPokemonDetailsEvolution,
  ): IPokemonDetailsCard {
    const description = this.getDescription(pokemonSpecie.flavor_text_entries)

    return {
      ...this.PokemonCard(pokemon) as IPokemonCard,
      abilities: pokemon.abilities.map(
        ({ ability }) => this.capitalizeFirstLetter(ability),
      ),
      weight: pokemon.weight / 10,
      height: pokemon.height,
      description: this.cleanDescription(description.flavor_text, pokemon.name),
      habitat: this.capitalizeFirstLetter(pokemonSpecie.habitat),
      version: this.capitalizeFirstLetter(description.version),
      stats: this.getStats(pokemon.stats),
      evolution,
    }
  }
}

export default new PokemonFactory()
