export interface IPokemonSpecieFlavorText {
  flavor_text: string,
  language: {
    name: string,
  },
  version: {
    name: string,
  },
}

export interface IPokemonSpecie {
  color: {
    name: string,
  },
  evolution_chain: {
    url: string
  },
  flavor_text_entries: IPokemonSpecieFlavorText[],
  habitat: {
    name: string,
  },
}
