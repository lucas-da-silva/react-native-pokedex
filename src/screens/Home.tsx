import React, { useState, useEffect, useCallback } from 'react'
import {
  KeyboardAvoidingView, FlatList, StyleSheet, View, Text, StatusBar,
} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { debounce } from 'lodash'
import {
  fetchPokemon, fetchPokemons, POKEMON_LIMIT, PokemonFactory,
} from '../utils'
import type { IPokemonCard, IScreens } from '../interfaces'
import {
  PokemonCard, PokemonNotFound, PokemonSearchInput, SkeletonPokemonCard,
} from '../components'
import { BACKGROUND_COLOR, COLORS } from '../styles'

type HomeProps = {
  navigation: NativeStackNavigationProp<IScreens, 'Home'>,
}

const SHORTEST_NAME_POKEMON = 5

export default function Home({ navigation }: HomeProps) {
  const [pokemons, setPokemons] = useState<IPokemonCard[]>([])
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
      setLoadingPokemons(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      if (!searchPokemon.trim()) {
        setFilteredPokemons(pokemons)
        return
      }

      const filtered = pokemons.filter(
        ({ id, name }) => name.toLowerCase().includes(searchPokemon.toLowerCase())
          || id === Number(searchPokemon),
      )

      if (!filtered.length
        && (/\d/.test(searchPokemon) || searchPokemon.length >= SHORTEST_NAME_POKEMON)) {
        fetchPokemon(searchPokemon).then((json) => {
          if (json) {
            const pokemon = PokemonFactory.PokemonCard(json) as IPokemonCard
            setFilteredPokemons([pokemon])
          }
          setFilteredPokemons([])
        })
      } else {
        setFilteredPokemons(filtered)
      }
    }, 500)

    debouncedSearch()

    return () => {
      debouncedSearch.cancel()
    }
  }, [searchPokemon, pokemons])

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

  const renderPokemonCard = ({ item }: { item: IPokemonCard }) => (
    <PokemonCard
      name={item.name}
      id={item.id}
      uri={item.uri}
      types={item.types}
      color={item.color}
      handlePress={handleDetailsPokemon}
    />
  )

  const renderSkeletonPokemonCard = () => <SkeletonPokemonCard />

  const renderListFooter = () => {
    if (loading) {
      return renderSkeletonPokemonCard()
    }
    return null
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
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
      </KeyboardAvoidingView>
      {pokemons.length > 0 && filteredPokemons.length === 0 && <PokemonNotFound />}
      {loadingPokemons ? renderSkeletonPokemonCard() : (
        <FlatList
          data={filteredPokemons}
          numColumns={2}
          renderItem={renderPokemonCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.containerPokemons}
          ListFooterComponent={renderListFooter()}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePokemons}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 28,
  },
  containerTitle: {
    marginTop: 20,
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.secundary,
  },
  containerPokemons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
