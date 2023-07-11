import React, { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import {
  ScrollView, StyleSheet, View, Text, StatusBar,
} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  fetchPokemon, fetchPokemons, POKEMON_LIMIT, PokemonFactory,
} from '../utils'
import type { IPokemonCard, IScreens } from '../interfaces'
import { PokemonCard, PokemonSearchInput, SkeletonPokemonCard } from '../components'

type HomeProps = {
  navigation: NativeStackNavigationProp<IScreens, 'Home'>,
}

const SHORTEST_NAME_POKEMON = 5

export default function Home({ navigation }: HomeProps) {
  const [pokemons, setPokemons] = useState<[] | IPokemonCard[]>([])
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemonCard[]>([])
  const [searchPokemon, setSearchPokemon] = useState('')
  const [loadingPokemons, setLoadingPokemons] = useState(true)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await fetchPokemons()
      setPokemons(fetchedPokemons)
      setFilteredPokemons(fetchedPokemons)
    }
    fetchData()
    setLoadingPokemons(false)
  }, [])

  const debouncedSearch = debounce(async () => {
    if (!searchPokemon.trim()) {
      return setFilteredPokemons(pokemons)
    }

    const filtered: [] | IPokemonCard[] = pokemons.filter(
      ({ id, name }) => name.toLowerCase().includes(searchPokemon.toLowerCase())
        || id === Number(searchPokemon),
    )

    if (!filtered.length && searchPokemon.length >= SHORTEST_NAME_POKEMON) {
      const json = await fetchPokemon(searchPokemon)
      if (json) {
        const pokemon = PokemonFactory.PokemonCard(json) as IPokemonCard
        return setFilteredPokemons([pokemon])
      }
    }

    return setFilteredPokemons(filtered)
  }, 500)

  useEffect(() => {
    debouncedSearch()

    return () => {
      debouncedSearch.cancel()
    }
  }, [searchPokemon])

  const loadMorePokemons = async () => {
    if (loading || filteredPokemons.length < POKEMON_LIMIT) return

    setLoading(true)
    const newOffset = offset + POKEMON_LIMIT
    const newPokemons = await fetchPokemons(POKEMON_LIMIT, newOffset)
    const newFilteredPokemons = [...filteredPokemons, ...newPokemons]
    setPokemons([...pokemons, ...newPokemons])
    setFilteredPokemons(newFilteredPokemons)
    setOffset(newOffset)
    setLoading(false)
  }

  const handleDetailsPokemon = useCallback((id: number) => {
    navigation.navigate('DetailsPokemon', { id })
  }, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5fbfb" />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          Search for a Pokémon by name or using its National Pokédex number.
        </Text>
      </View>
      <PokemonSearchInput
        searchPokemon={searchPokemon}
        setSearchPokemon={setSearchPokemon}
      />
      {(pokemons.length > 0 && !filteredPokemons.length)
        && <Text>Pokemon not found.</Text>}
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
          {loadingPokemons ? <SkeletonPokemonCard /> : filteredPokemons.map(({
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
    marginTop: 20,
    marginBottom: 18,
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
