import React, { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'
import DetailsPokemonAbout from './DetailsPokemonAbout'
import DetailsPokemonBaseStats from './DetailsPokemonBaseStats'
import DetailsPokemonEvolution from './DetailsPokemonEvolution'
import DetailsPokemonMoves from './DetailsPokemonMoves'

type DetailsPokemonNavbarProps = {
  handlePokemonInformation(component: React.ComponentType): void;
};

const pokemonInformation = [
  {
    name: 'About',
    component: DetailsPokemonAbout,
  },
  {
    name: 'Base Stats',
    component: DetailsPokemonBaseStats,
  },
  {
    name: 'Evolution',
    component: DetailsPokemonEvolution,
  },
  {
    name: 'Moves',
    component: DetailsPokemonMoves,
  },
]

export default function DetailsPokemonNavbar({
  handlePokemonInformation,
}: DetailsPokemonNavbarProps) {
  const [informationDisplay, setInformationDisplay] = useState<string>('About')

  const handleInformation = (name: string, component: React.ComponentType): void => {
    handlePokemonInformation(component)
    setInformationDisplay(name)
  }

  return (
    <View style={styles.container}>
      {pokemonInformation.map(({ name, component }) => (
        <TouchableOpacity
          key={name}
          onPress={() => handleInformation(name, component)}
        >
          <Text
            style={[
              styles.textNavbar,
              informationDisplay === name ? styles.informationDisplay : {},
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  textNavbar: {
    color: '#2c304f',
    fontWeight: 'bold',
    fontSize: 15,
  },
  informationDisplay: {
    borderBottomWidth: 2,
    borderBottomColor: '#2c304f',
    paddingBottom: 10,
  },
})
