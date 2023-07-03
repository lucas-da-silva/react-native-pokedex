import type { ITypesPokemons } from '../utils'
import { IPokemon, IPokemonCard } from './Pokemon'
import { IPokemonSpecie } from './PokemonSpecie'
import 'react-native'

export interface IPokemonDetails extends IPokemon {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  },
  types: {
    type: {
      name: ITypesPokemons
    }
  }[],
  abilities: {
    ability: {
      name: string
    }
  }[],
  weight: number,
  height: number
}

export interface IPokemonDetailsCard extends IPokemonCard {
  abilities: string[]
  weight: number,
  height: number,
  description: {
    text: string,
    version: string
  }
}

export interface IPokemonDetailsSpecie extends IPokemonDetails, IPokemonSpecie {}
