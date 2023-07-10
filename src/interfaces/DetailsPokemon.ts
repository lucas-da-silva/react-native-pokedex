import { IPokemonDetailsCard } from './PokemonDetails'

interface IDetailsPokemonInfo {
  pokemon: IPokemonDetailsCard,
  handleEvolution(id: number): void,
}

export default IDetailsPokemonInfo
