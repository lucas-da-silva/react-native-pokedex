import React, { useState, useEffect } from 'react'
import {
  ScrollView, StyleSheet, View, Text, StatusBar,
} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { fetchPokemons, POKEMON_LIMIT } from '../utils'
import type { IPokemonCard, IScreens } from '../interfaces'
import { PokemonCard } from '../components'
import SkeletonPokemonCard from '../components/SkeletonPokemonCard'

type HomeProps = {
  navigation: NativeStackNavigationProp<IScreens, 'Home'>
}

export default function Home({ navigation }: HomeProps) {
  const [pokemons, setPokemons] = useState<[] | IPokemonCard[]>([])
  const [loadingPokemons, setLoadingPokemons] = useState(true)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await fetchPokemons()
      setPokemons(fetchedPokemons)
    }
    fetchData()
    setLoadingPokemons(false)
  }, [])

  const loadMorePokemons = async () => {
    if (loading) return

    setLoading(true)
    const newOffset = offset + POKEMON_LIMIT
    const newPokemons = await fetchPokemons(POKEMON_LIMIT, newOffset)
    setPokemons([...pokemons, ...newPokemons])
    setOffset(newOffset)
    setLoading(false)
  }

  const handleDetailsPokemon = (id: number): void => {
    navigation.navigate('DetailsPokemon', { id })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5fbfb" />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          Search for a Pokémon by name or using its National Pokédex number.
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
          const isEndReached = layoutMeasurement.height + contentOffset.y
          >= contentSize.height - 100
          if (isEndReached) {
            loadMorePokemons()
          }
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.containerPokemons}>
          {loadingPokemons ? <SkeletonPokemonCard /> : pokemons.map(({
            name, id, uri, types, color,
          }) => (
            <PokemonCard
              name={name}
              key={id}
              id={id}
              uri={uri}
              types={types}
              color={color}
              handlePress={handleDetailsPokemon}
            />
          ))}
          {loading && <SkeletonPokemonCard />}
        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbfb',
    justifyContent: 'center',
    paddingHorizontal: 28,
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
