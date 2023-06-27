import type { ITypesPokemons } from '../utils'

export interface IPokemon {
  name: string,
  id: number
}

export interface IPokemonCard extends IPokemon {
  uri: string,
  types: ITypesPokemons[]
}
