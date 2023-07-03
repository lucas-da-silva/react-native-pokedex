import React from 'react'
import { View, Text } from 'react-native'
import { IDetailsPokemonInfo } from '../interfaces'

export default function DetailsPokemonBaseStats({ pokemon }:IDetailsPokemonInfo) {
  return (
    <View>
      <Text>Details Pokemon Base Stats</Text>
    </View>
  )
}
