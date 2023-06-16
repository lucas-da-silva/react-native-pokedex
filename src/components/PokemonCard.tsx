import React from 'react'
import {
  View, Text, Image, StyleSheet,
} from 'react-native'
import { IPokemonCard } from '../interfaces/Pokemon'

export default function PokemonCard({ name, id, uri }: IPokemonCard) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri,
        }}
        style={styles.image}
      />
      <Text>{name}</Text>
      <Text>{`#00${id}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    marginBottom: 15,
    borderRadius: 20,
    width: 185,
    height: 150,
  },
  image: {
    width: 100,
    height: 100,
  },
})
