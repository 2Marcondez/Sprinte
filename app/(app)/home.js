import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext';

export default function Home() {
  const {logout,user} = useAuth();
  const handleLogout = async()=>{
    await logout();
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Página de Favoritos</Text>
      <Pressable onPress={handleLogout}>
      <Text>Sair</Text>
      </Pressable>
    </View>
  )
}