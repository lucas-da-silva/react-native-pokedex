import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'
import { formatPokemonID } from '../utils'

type DetailsPokemonHeaderProps = {
  id: number
  name: string
  handleBackButton(): void
}

export default function DetailsPokemonHeader(
  { id, name, handleBackButton }:DetailsPokemonHeaderProps,
) {
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        style={styles.containerBackButton}
        onPress={handleBackButton}
      >
        <Ionicons
          name="md-arrow-back-sharp"
          style={styles.backButton}
        />
      </TouchableOpacity>
      <View style={styles.containerTitle}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>{formatPokemonID(id)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    marginTop: 30,
  },
  containerBackButton: {
    height: 28,
    width: 28,
    position: 'absolute',
    marginTop: 4,
    zIndex: 1,
  },
  backButton: {
    fontSize: 28,
    color: '#5e616f',
  },
  containerTitle: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c304f',
  },
  id: {
    color: '#6a6e7a',
    fontSize: 16,
    fontWeight: 'bold',
  },
})