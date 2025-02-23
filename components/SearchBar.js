import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function SearchBar() {
  return (
    <View style={{
        display: 'flex',
        flexDirectio: 'row',
        marginTop:15,
        paddingHorizontal:5,
        backgroundColor:'white',
        borderRadius:6,                        
    }}>
      <GooglePlacesAutocomplete
      placeholder='Buscar por Grupos e Clubes de Corrida'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
    </View>
  )
}