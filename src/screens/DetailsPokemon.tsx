import type { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  View, StyleSheet, StatusBar, Image,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { IDetailsPokemonInfo, IPokemonDetailsCard, IScreens } from '../interfaces'
import { TypesPokemons, fetchPokemonById } from '../utils'
import { DetailsPokemonHeader, DetailsPokemonNavbar } from '../components'

type DetailsPokemonsProps = {
  navigation: NativeStackNavigationProp<IScreens, 'DetailsPokemon'>,
  route: RouteProp<IScreens, 'DetailsPokemon'>;
}

export default function DetailsPokemons({ route, navigation }: DetailsPokemonsProps) {
  const [pokemon, setPokemon] = useState<IPokemonDetailsCard | null>(null)
  const [pokemonInformation, setPokemonInformation] = useState<React.ReactNode>()

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemon = await fetchPokemonById(route.params.id)
      setPokemon(fetchedPokemon)
    }
    fetchData()
  }, [])

  const handleBackButton = (): void => {
    navigation.navigate('Home')
  }

  const handlePokemonInformation = (
    component: React.ComponentType<IDetailsPokemonInfo>,
  ): void => {
    setPokemonInformation(() => React.createElement(
      component,
      { pokemon } as { pokemon: IPokemonDetailsCard },
    ))
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
              <View style={styles.containerContent}>
                <DetailsPokemonNavbar
                  handlePokemonInformation={handlePokemonInformation}
                />
                {pokemonInformation}
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
    marginTop: 20,
    width: '100%',
    height: 225,
    marginLeft: 'auto',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 210,
    height: 210,
  },
  containerContent: {
    marginTop: 10,
  },
})
