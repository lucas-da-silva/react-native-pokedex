import type { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  View, StyleSheet, StatusBar, Image,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { IPokemonDetailsCard, IScreens } from '../interfaces'
import { TypesPokemons, fetchPokemonById } from '../utils'
import DetailsPokemonHeader from '../components/DetailsPokemonHeader'

type DetailsPokemonsProps = {
  navigation: NativeStackNavigationProp<IScreens, 'DetailsPokemon'>,
  route: RouteProp<IScreens, 'DetailsPokemon'>;
}

export default function DetailsPokemons({ route, navigation } : DetailsPokemonsProps) {
  const [pokemon, setPokemon] = useState<IPokemonDetailsCard | null>(null)

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemon = await fetchPokemonById(route.params.id)
      setPokemon(fetchedPokemon)
    }
    fetchData()
  }, [])

  const handleBackButton = (): void => {
    console.log('BACK FUNCTION')
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5fbfb" />
      {
        pokemon && (
          <View>
            <DetailsPokemonHeader
              id={pokemon.id}
              name={pokemon.name}
              handleBackButton={handleBackButton}
            />
            <View>
              <View style={[
                styles.containerImage,
                { backgroundColor: TypesPokemons[pokemon.types[0]].color }]}
              >
                <Image source={{ uri: pokemon.uri }} style={styles.image} />
              </View>
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
    paddingHorizontal: 30,
    backgroundColor: '#f5fbfb',
  },
  containerImage: {
    marginTop: 30,
    width: '100%',
    height: 250,
    marginLeft: 'auto',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
})
