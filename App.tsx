import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Pokemons from './src/components/Pokemons'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          Pesquise um Pokémon pelo nome ou usando seu número National Pokédex.
        </Text>
      </View>
      <Pokemons />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
  },
  containerTitle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#2d2f58',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#656a81',
  },
})
