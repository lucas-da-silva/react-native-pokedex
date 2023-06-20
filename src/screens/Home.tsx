import React, { useState, useEffect } from 'react'
import {
  ScrollView, StyleSheet, View, Text, StatusBar,
} from 'react-native'
import { fetchPokemons } from '../utils'
import type { IPokemonCard } from '../interfaces'
import PokemonCard from '../components/PokemonCard'

export default function Home() {
  const [pokemons, setPokemons] = useState<[] | IPokemonCard[]>([])

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await fetchPokemons()
      setPokemons(fetchedPokemons)
    }
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          Pesquise um Pokémon pelo nome ou usando seu número National Pokédex.
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerPokemons}>
          {pokemons
        && pokemons.map(({
          name, id, uri, types,
        }) => (
          <PokemonCard name={name} key={id} id={id} uri={uri} types={types} />
        ))}
        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerTitle: {
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    color: '#2d2f58',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#656a81',
  },
  containerPokemons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
