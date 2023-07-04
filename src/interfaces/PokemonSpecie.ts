export interface IPokemonSpecieFlavorText {
  flavor_text: string,
  language: {
    name: string
  },
  version: {
    name: string
  }
}

export interface IPokemonSpecie {
  color: {
    name: string
  },
  flavor_text_entries: IPokemonSpecieFlavorText[]
  habitat: {
    name: string
  }
}
