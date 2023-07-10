interface IEvolutionDetails {
  min_level: number,
  min_happiness: number,
  trigger: {
    name: string,
  },
}

export interface IEvolution {
  evolution_details: [IEvolutionDetails] | [],
  species: {
    name: string,
    url: string
  },
  evolves_to: IEvolution[] | []
}

export interface IEvolutionChain {
  chain: IEvolution
}
