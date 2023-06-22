import type { ITypesPokemons } from '../utils'

export interface IPokemon {
  name: string,
  id: string
}

export interface IPokemonCard extends IPokemon {
  uri: string,
  types: ITypesPokemons[]
}
