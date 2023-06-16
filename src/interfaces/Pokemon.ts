interface IPokemon {
  name: string,
  id: number
}

export interface IPokemonDetails extends IPokemon {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
}

export interface IPokemonCard extends IPokemon {
  uri: string
}
