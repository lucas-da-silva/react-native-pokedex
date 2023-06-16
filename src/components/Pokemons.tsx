import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import fetchPokemons from '../utils/fetchPokemons'
import { IPokemonCard } from '../interfaces/Pokemon'
import PokemonCard from './PokemonCard'

export default function Pokemons() {
  const [pokemons, setPokemons] = useState<[] | IPokemonCard[]>([])

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await fetchPokemons()
      setPokemons(fetchedPokemons)
    }
    fetchData()
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerPokemons}>
        {pokemons
        && pokemons.map(({ name, id, uri }) => (
          <PokemonCard name={name} key={id} id={id} uri={uri} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerPokemons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
