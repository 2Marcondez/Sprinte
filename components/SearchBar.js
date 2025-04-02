import { View, Text } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Adicionei hp para altura
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBar() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 25, // Valor alto para bordas bem arredondadas
        width: wp('70%'), // Largura 70% da tela
        height: hp('6%'), // Altura fixa para reforçar o formato oval
        alignSelf: 'center',
        justifyContent: 'center', // Centraliza o conteúdo interno
        paddingHorizontal: 0
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Buscar por Grupos e Clubes"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: 'YOUR_API_KEY', 
          language: 'pt-BR',
        }}
        styles={{
          textInputContainer: {
            backgroundColor: '#F5F5F5', // Cor de fundo mais neutra
            borderRadius: 25, 
            borderWidth: 1,
            borderColor: '#D8D8D8', // Cor da borda mais suave
            width: '100%',
            height: '100%',
          },
          textInput: {
            height: hp('6%'),
            color: '#33333', // Cor do texto mais escuro para boa legibilidade
            fontSize: 16,
            backgroundColor: '#FFFFFF', // Fundo branco da barra de pesquisa
            borderRadius: 25, 
            paddingHorizontal: 15,
          },
          listView: {
            backgroundColor: '#FFFFFF', // Fundo branco para a lista de sugestões
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#000',
            width: wp('70%'),
            alignSelf: 'center',
          },
          description: {
            color: '#333333', // Cor das sugestões em cinza escuro
            fontSize: 14,
          },
          separator: {
            height: 1,
            backgroundColor: '#E0E0E0', // Cor suave para as divisórias
          },
        }}
      />
    </View>
  );
}
