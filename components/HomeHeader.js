import { Text, View, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { MenuItem } from './CustomMenuItens';
import { useAuth } from '../context/authContext';
import { useNavigation } from '@react-navigation/native'; // Substituímos useRouter por useNavigation
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const ios = Platform.OS === 'ios';

export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation(); // Hook do react-navigation

  const handleProfile = () => {
    navigation.navigate('EditProfile'); // Navega para a tela EditProfile no Stack
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View 
      style={{ paddingTop: ios ? top : top + 5 }} 
      className="flex-row justify-between items-center px-6 bg-custom-green opacity-100 pb-0.5 rounded-b-3xl"
    >
      <View className="py-1">
        <Image 
          style={{ 
            height: hp(8),
            width: hp(8),
            resizeMode: 'contain',
            marginBottom: -10,
            marginTop: -10,
          }}
          source={require('../assets/images/logoSprinte.png')}
          placeholder={blurhash}
          transition={200}
        />
      </View>

      <View className="py-1">
        <Menu>
          <MenuTrigger customStyles={{ triggerWrapper: {} }}>
            <Image 
              style={{ 
                height: hp(5.5),
                aspectRatio: 1, 
                borderRadius: 100,
                marginBottom: -6,
                marginTop: -6,
              }}
              source={{ uri: "https://picsum.photos/id/237/200/300" }}
              placeholder={{ blurhash }}
              transition={200}
            />
          </MenuTrigger>
          
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 8,
                borderCurve: 'continuous',
                marginTop: 45,
                marginLeft: 15,
                backgroundColor: 'white',
                width: 160,
                shadowOpacity: 0.2,
                elevation: 0,
                shadowColor: 'transparency',
              }
            }}
          >
            <TouchableOpacity onPress={handleProfile}>
              <MenuItem 
                action={handleProfile}
                text="Perfil"
                icon={<Feather name="user" size={hp(2.5)} color="#000000" />}
              />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={handleLogout}>
              <MenuItem 
                action={handleLogout}
                text="Desconectar"
                icon={<MaterialIcons name="logout" size={hp(2.5)} color="#000000" />}
              />
            </TouchableOpacity>
          </MenuOptions> 
        </Menu>
      </View>
    </View>
  );
}

const Divider = () => {
  return (
    <View className="p-[1px] w-full bg-neutral-200"/>
  );
};