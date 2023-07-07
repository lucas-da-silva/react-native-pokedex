import React from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native'
import { IDetailsPokemonInfo, IPokemonDetailsEvolution } from '../interfaces'
import { PokemonFactory, TypesPokemons } from '../utils'

export default function DetailsPokemonEvolution(
  { pokemon: { evolution } }: IDetailsPokemonInfo,
) {
  const renderPokemon = ({
    id, color, image, name, types,
  }: IPokemonDetailsEvolution) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => console.log(id)}
      key={id}
      style={[
        styles.pokemonCard, { backgroundColor: TypesPokemons[color].color },
      ]}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.id}>{`#${PokemonFactory.PokemonID(id)}`}</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.typesContainer}>
        {types.map((type) => <Text style={styles.type} key={type}>{type}</Text>)}
      </View>
    </TouchableOpacity>
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
      <View style={styles.evolutionContainer}>
        {renderPokemon(evolution)}
      </View>
      {evolution.evolutions.length > 0 && renderEvolutions(evolution.evolutions)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  evolutionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pokemonCard: {
    borderRadius: 15,
    paddingHorizontal: 5,
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginTop: 6,
    marginBottom: 7,
  },
  id: {
    fontSize: 11,
    color: '#6a6e7a',
  },
  name: {
    fontSize: 12,
    marginBottom: 5,
    color: '#2c304f',
    fontWeight: 'bold',
  },
  typesContainer: {
    marginBottom: 10,
  },
  type: {
    fontSize: 12,
    color: '#2c304f',
    marginBottom: 2,
  },
})
