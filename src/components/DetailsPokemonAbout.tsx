import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { IDetailsPokemonInfo } from '../interfaces'
import { heightToFeetAndInches, weightToLibra } from '../utils'

export default function DetailsPokemonAbout({ pokemon }: IDetailsPokemonInfo) {
  const {
    abilities, weight, height, description, habitat, version,
  } = pokemon

  return (
    <View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {description}
        </Text>
        <Text style={styles.version}>{`from Pokemon ${version}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.field}>Height</Text>
        <Text
          style={styles.value}
        >
          {`${heightToFeetAndInches(height)} (${height / 10} m)`}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.field}>Weight</Text>
        <Text style={styles.value}>
          {`${weightToLibra(weight)} (${weight} kg)`}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.field}>Habitat</Text>
        <Text style={styles.value}>{habitat}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.field}>Abilities</Text>
        <Text style={styles.value}>{abilities.join(', ')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer: {
    marginBottom: 5,
  },

  description: {
    color: '#2c304f',
  },

  version: {
    textAlign: 'right',
    fontSize: 12,
    color: '#6e7278',
  },

  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  field: {
    color: '#6e7278',
    marginRight: 45,
    width: 73,
  },

  value: {
    color: '#2c304f',
  },
})
