import { View, Text, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import BackgroundImage from '../components/BackgroundImage';
import { useAuth } from '../context/authContext';


export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Verificando se ambos os campos estão preenchidos
    if (!email || !password) {
      Alert.alert('Login', 'Preencha todos os campos');
      return;
    }
  //processo de login
    setLoading(true);
    const response = await login(email, password)
    setLoading(false);
    console.log('resposta: ', response);
    if(!response.sucess){
      Alert.alert('Login', response.msg)
    }


  }

  return (
    <BackgroundImage>
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">

        {/* login imagem */}
        <View className="items-center">
          <Image style={{ height: hp(20), width: hp(30) }} resizeMode="contain" source={require('../assets/images/logo.png')} />
        </View>
        <View className="gap-10">
          <Text style={{ fontSize: hp(3) }} className="font-bold tracking-wider text-center text-neutral-100">BEM VINDO</Text>

          {/* email input */}
          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-25 border-2 border-neutral-50 items-center rounded-2xl">
              <Octicons name="mail" size={hp(2.7)} color="white" />
              <TextInput
                value={email} // Agora estamos utilizando o valor do useState
                onChangeText={setEmail}  // Atualiza o estado do email
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-white"
                placeholder="Email"
                placeholderTextColor="white"
              />
            </View>

            {/* senha input */}
            <View className="gap-3">
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-25 border-2 border-neutral-50 items-center rounded-2xl">
                <Octicons name="lock" size={hp(2.7)} color="white" />
                <TextInput
                  value={password}  // Agora estamos utilizando o valor do useState
                  onChangeText={setPassword}  // Atualiza o estado da senha
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-white"
                  placeholder="Senha"
                  placeholderTextColor="white"
                  secureTextEntry 
                />
              </View>
              <Text style={{ fontSize: hp(1.5) }} className="font-semibold text-right text-neutral-50">Esqueceu a senha?</Text>
            </View>

            {/* login botão */}

          <View>
            {
              loading? (
                <View className="flex-row justify-center">
                  <Loading size={hp(9)}/>
                </View>
              ):( 
                <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5) }} className="bg-zinc-100 rounded-xl justify-center items-center">
              <Text style={{ fontSize: hp(2.7) }} className="text-slate font-bold tracking-wider">
                Login
              </Text>
            </TouchableOpacity>
              )
            }
          </View>

            

            {/* signup botão */}
            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-100 ">Não tem uma conta?</Text>
              <Pressable onPress={() => router.push('signUp')}>
                <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-green-200 "> Realize seu cadastro</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
    </CustomKeyboardView>
    </BackgroundImage>
  );
}