import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native'
import { IDetailsPokemonInfo, IPokemonDetailsEvolution } from '../interfaces'
import { PokemonFactory, TypesPokemons } from '../utils'

export default function DetailsPokemonEvolution(
  { pokemon: { evolution }, handleEvolution }: IDetailsPokemonInfo,
) {
  const validateEvolution = (level: string | number | undefined): boolean => {
    if (!level) return false
    return true
  }

  const renderPokemon = ({
    id, color, image, name, types, evolution: { trigger, method, css },
  }: IPokemonDetailsEvolution) => (
    <View style={styles.containerPokemon}>
      {validateEvolution(method) && (
        <View style={styles.nextEvolutionContainer}>
          <Ionicons name="md-arrow-forward-sharp" style={styles.arrowForward} />
          <View style={styles.triggerContainer}>
            <Text style={styles.trigger}>
              {trigger}
              <Text style={css}>
                {' '}
                {method}
              </Text>
            </Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleEvolution(id)}
        key={id}
        style={[
          styles.pokemonCard,
          {
            backgroundColor: TypesPokemons[color].color,
            height: types.length > 1 ? 155 : 135,
          },
        ]}
      >
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.id}>{`#${PokemonFactory.PokemonID(id)}`}</Text>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.typesContainer}>
          {types.map((type) => <Text style={styles.type} key={type}>{type}</Text>)}
        </View>
      </TouchableOpacity>
    </View>
  )

  const renderEvolutions = (evolutions: IPokemonDetailsEvolution[]) => (
    evolutions.map((pokemon) => (
      <View key={pokemon.id} style={styles.evolutionContainer}>
        {renderPokemon(pokemon)}
        {pokemon.evolutions.length > 0 && renderEvolutions(pokemon.evolutions)}
      </View>
    ))
  )

  return (
    <View style={styles.container}>
      {renderPokemon(evolution)}
      {evolution.evolutions.length > 0 && renderEvolutions(evolution.evolutions)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  containerPokemon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  evolutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonCard: {
    borderRadius: 15,
    paddingHorizontal: 3,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginTop: 6,
    marginBottom: 7,
  },
  id: {
    fontSize: 12,
    color: '#6a6e7a',
  },
  name: {
    fontSize: 11,
    marginBottom: 3,
    color: '#2c304f',
    fontWeight: 'bold',
  },
  typesContainer: {
    marginBottom: 10,
  },
  type: {
    fontSize: 12,
    color: '#2c304f',
  },
  nextEvolutionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 61,
  },
  arrowForward: {
    fontSize: 23,
    color: '#6a6e7a',
  },
  triggerContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trigger: {
    fontSize: 11,
    textAlign: 'center',
  },
})
