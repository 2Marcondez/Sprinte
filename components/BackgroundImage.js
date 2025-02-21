import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

// Obtém as dimensões da tela
const { width, height } = Dimensions.get('window')

export default function BackgroundImage({ children }) {
  return (
    <ImageBackground 
      source={require('../assets/images/background1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Renderiza os componentes filhos dentro do ImageBackground */}
      <View style={styles.container}>
        {children}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  container: {
    flex: 1,
  }
})