import type { ITypesPokemons } from '../utils'
import { IPokemon, IPokemonCard } from './Pokemon'
import { IPokemonSpecie } from './PokemonSpecie'
import 'react-native'

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
  stats: {
    base_stat: number,
    stat: {
      name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defensef' | 'speed',
    },
  }[],
}

export interface IPokemonDetailsCard extends IPokemonCard {
  abilities: string[],
  weight: number,
  height: number,
  description: string,
  version: string,
  habitat: string,
  stats: {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
    total: number
  },
}

export interface IPokemonDetailsSpecie extends IPokemonDetails, IPokemonSpecie {}
