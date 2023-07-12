import {
  EvolutionTriggerName,
  IEvolutionDetails,
  IEvolutionTriggerMethod,
} from '../interfaces'
import capitalizeFirstLetter from './formatString'

type EvolutionMap = {
  [key in EvolutionTriggerName]: (pokemon: IEvolutionDetails) => IEvolutionTriggerMethod;
};

const getLevel = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => ({
  trigger: 'Level',
  method: pokemon.min_level,
})

const getTrade = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => ({
  trigger: 'Trade holding',
  method: capitalizeFirstLetter(pokemon.held_item),
  css: { fontWeight: 'bold' },
})

const evolutionMapping: EvolutionMap = {
  'level-up': getLevel,
  trade: getTrade,
}

const getEvolution = (
  pokemon: IEvolutionDetails,
): IEvolutionTriggerMethod => evolutionMapping[pokemon.trigger.name](pokemon)

export default getEvolution
