import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'
import { IScreens } from '../interfaces'

type DetailsPokemonsProps = {
  route: RouteProp<IScreens, 'DetailsPokemon'>;
}

export default function DetailsPokemons({ route } : DetailsPokemonsProps) {
  return (
    <Text>
      Hello,
      {' '}
      {route.params.id}
    </Text>
  )
}
