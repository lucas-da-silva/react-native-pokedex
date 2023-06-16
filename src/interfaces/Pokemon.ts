import { TypesPokemons } from '../utils'

interface IPokemon {
  name: string,
  id: number
}

type TypePokemon = keyof typeof TypesPokemons

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
      name: TypePokemon
    }
  }[]
}

export interface IPokemonCard extends IPokemon {
  uri: string,
  types: TypePokemon[]
}
