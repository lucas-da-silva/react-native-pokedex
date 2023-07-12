export type EvolutionTriggerName =
  'level-up'
  | 'trade'
  | 'use-item'
  | 'shed'
  | 'spin'
  | 'tower-of-darkness'
  | 'tower-of-waters'
  | 'three-critical-hits'
  | 'take-damage'
  | 'other'
  | 'agile-style-move'
  | 'strong-style-move'
  | 'recoil-damage';

export interface IEvolutionDetails {
  held_item: {
    name: string,
  },
  min_level: number,
  min_happiness: number,
  trigger: {
    name: EvolutionTriggerName
  }
}

export interface IEvolutionTriggerMethod {
  trigger: string,
  method: string | number,
  css?: {
    [key:string]: string | number
  }
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
