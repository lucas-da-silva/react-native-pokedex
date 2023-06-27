import type { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Text, View, StyleSheet, StatusBar,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import type { IPokemonDetailsCard, IScreens } from '../interfaces'
import { fetchPokemonById, formatPokemonID } from '../utils'

type DetailsPokemonsProps = {
  route: RouteProp<IScreens, 'DetailsPokemon'>;
}

export default function DetailsPokemons({ route } : DetailsPokemonsProps) {
  const [pokemon, setPokemon] = useState<IPokemonDetailsCard | null>(null)

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemon = await fetchPokemonById(route.params.id)
      setPokemon(fetchedPokemon)
    }
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5fbfb" />
      {
        pokemon && (
          <View style={styles.containerHeader}>
            <Ionicons name="arrow-back" style={styles.arrowLeft} />
            <View style={styles.containerTitle}>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text style={styles.id}>{formatPokemonID(pokemon.id)}</Text>
            </View>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5fbfb',
  },
  containerHeader: {
    flexDirection: 'row',
    marginTop: 40,
  },
  arrowLeft: {
    fontSize: 26,
    color: '#5e616f',
    position: 'relative',
  },
  containerTitle: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2c304f',
  },
  id: {
    color: '#6a6e7a',
  },
})
