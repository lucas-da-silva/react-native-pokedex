import React from 'react'
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native'
import type { IPokemonCard } from '../interfaces'
import { TypesPokemons } from '../utils'

interface PokemonCardProps extends IPokemonCard {
  handlePress(id: number): void;
}

export default function PokemonCard({
  name, id, uri, types, handlePress,
}: PokemonCardProps) {
  return (
    <TouchableOpacity onPress={() => handlePress(id)}>
      <View
        style={[styles.container, { backgroundColor: TypesPokemons[types[0]].color }]}
      >
        <View style={styles.containerId}>
          <Text style={styles.id}>{id.toString().padStart(3, '0')}</Text>
        </View>
        <View style={styles.containerImage}>
          <Image
            source={{
              uri,
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        <View style={styles.containerTypes}>
          {
            types.map((type) => (
              <View key={type} style={styles.containerType}>
                <Text style={styles.type}>{type}</Text>
              </View>
            ))
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginHorizontal: 7.5,
    borderRadius: 15,
    width: 150,
    height: 210,
    alignItems: 'center',
  },
  containerId: {
    alignSelf: 'flex-end',
    marginRight: 7,
    marginTop: 2,
  },
  id: {
    fontSize: 13,
    color: '#656a81',
    fontWeight: '500',
  },
  containerImage: {
    marginTop: 7,
    marginBottom: 14,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    color: '#2d2f58',
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 17,
  },
  containerTypes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  containerType: {
    width: 70,
    alignItems: 'center',
    height: 30,
  },
  type: {
    fontSize: 13,
    color: '#2d2f58',
  },
})
