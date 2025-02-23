import { Text, View, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { blurhash } from '../utils/common'
import { MenuItem } from './CustomMenuItens'
import { useAuth } from '../context/authContext'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Feather, MaterialIcons } from '@expo/vector-icons';


const ios = Platform.OS === 'ios'

export default function HomeHeader() {
  const {user, logout} = useAuth();
  const { top } = useSafeAreaInsets()
  const handleProfile = ()=>{

  }

  const handleLogout = async()=>{
      await logout()
  }

  return (
    <View 
      style={{ paddingTop: ios ? top : top + 5 }} 
      className="flex-row justify-between items-center px-6 bg-white opacity-100 pb-0.5 rounded-b-3xl"
    >
      <View className="py-1">
        <Image 
          style={{ 
            height: hp(8), // Aumentado de 6 para 8
            width: hp(8), // Aumentado de 6 para 8
            resizeMode: 'contain',
            marginBottom: -10, // Ajuste negativo para compensar o tamanho maior
            marginTop: -10, // Ajuste negativo para compensar o tamanho maior
          }}
          source={require('../assets/images/logoSprinte.png')}
          placeholder={blurhash}
          transition={200}
        />
      </View>

      <View className="py-1">
      <View>
        <Menu>
          <MenuTrigger customStyles={{
            triggerWrapper: {
            }
          }}>
            <Image 
            style={{ 
              height: hp(5.5), // Aumentado de 4 para 5.5
              aspectRatio: 1, 
              borderRadius: 100,
              marginBottom: -6, // Ajuste negativo para compensar o tamanho maior
              marginTop: -6, // Ajuste negativo para compensar o tamanho maior
            }}
            source="https://picsum.photos/id/237/200/300"
            placeholder={{ blurhash }}
            transition={200}
          />
          </MenuTrigger>
           <MenuOptions
            customStyles={{
              optionsContainer:{
                borderRadius:8,
                borderCurve:'continuous',
                marginTop:45,
                marginLeft:15,
                backgroundColor:'white',
                width: 160,
                shadowOpacity:0.2,
                elevation: 0,
                shadowColor:'transparency'
              }
            }}
           >
            <MenuItem 
              text="Perfil"
              action={(handleProfile)}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#00000"/>}
            />
            <Divider/>
             <MenuItem 
              text="Desconectar"
              action={(handleLogout)}
              value={null}
              icon={<MaterialIcons name="logout" size={hp(2.5)} color="#00000"/>}
            />  
          </MenuOptions> 
        </Menu>
      </View>
      </View>
    </View>
  )
}

const Divider = ()=>{
  return(
    <View className="p-[1px] w-full bg-neutral-200"/>
  )
}
