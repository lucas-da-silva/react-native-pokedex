import type { ITypesPokemons } from '../utils'
import { IEvolutionChain, IEvolutionTriggerMethod } from './PokemonEvolution'
import { IPokemon, IPokemonCard } from './Pokemon'
import { IPokemonSpecie } from './PokemonSpecie'

export interface IPokemonStats {
  base_stat: number,
  stat: {
    name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defensef' | 'speed',
  },
}

export interface IPokemonFormattedStats {
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number,
  total: number,
}

export interface IPokemonDetails extends IPokemon {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string,
      },
    },
  },
  types: {
    type: {
      name: ITypesPokemons
    },
  }[],
  abilities: {
    ability: {
      name: string,
    },
  }[],
  weight: number,
  height: number,
  stats: IPokemonStats[],
  species: {
    url: string
  }
}

export interface IPokemonDetailsEvolution {
  id: number,
  name: string,
  image: string,
  color: ITypesPokemons,
  types: ITypesPokemons[],
  evolutions: IPokemonDetailsEvolution[]
  evolution: IEvolutionTriggerMethod
}

export interface IPokemonDetailsCard extends IPokemonCard {
  abilities: string[],
  weight: number,
  height: number,
  description: string,
  version: string,
  habitat: string,
  stats: IPokemonFormattedStats,
  evolution: IPokemonDetailsEvolution
}

export interface IPokemonCompleteDetails extends
  IPokemonDetails, IPokemonSpecie, IEvolutionChain {}
