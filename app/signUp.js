import { View, Text, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import BackgroundImage from '../components/BackgroundImage';
import { useAuth } from '../context/authContext';


export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  // Usando useState para os valores de email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')

  const handleRegister= async () => {
    // Verificando se ambos os campos estão preenchidos
    if (!email || !password || !fullname || !username) {
      Alert.alert('Registro', 'Preencha todos os campos');
      return;
    }
    setLoading(true);

    let response = await register(email, password, fullname, username);
    setLoading(false);

    console.log('got result: ', response);
    if(!response.sucess){
      Alert.alert('Sign Up', response.msg)
    }
  };

  return (
    <BackgroundImage>
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12 " >

        {/* login imagem */}
        <View className="items-center">
          <Image style={{ height: hp(20), width:hp(30) }} resizeMode="contain" source={require('../assets/images/logo.png')} />
        </View>
        <View className="gap-10">
          <Text style={{ fontSize: hp(3) }} className="font-bold tracking-wider text-center text-neutral-200">REGISTRO</Text>

          {/* Nome completo input */}
          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-25 border-2 border-neutral-50 items-center rounded-2xl">
              <Feather name="user" size={hp(2.7)} color="white" />
              <TextInput
                value={fullname}  // Agora estamos utilizando o valor do useState
                onChangeText={setFullname}  // Atualiza o estado do email
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-white"
                placeholder="Nome Completo"
                placeholderTextColor="white"
              />
            </View>

            {/* Nome de usuario input */}

            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-25 border-2 border-neutral-50 items-center rounded-2xl">
              <Feather name="image" size={hp(2.7)} color="white" />
              <TextInput
                value={username}  // Agora estamos utilizando o valor do useState
                onChangeText={setUsername}  // Atualiza o estado do email
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-white"
                placeholder="Nome de Usuario"
                placeholderTextColor="white"
              />
            </View>

            {/* email input */}

            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-25 border-2 border-neutral-50 items-center rounded-2xl">
              <Octicons name="mail" size={hp(2.7)} color="white" />
              <TextInput
                value={email}  // Agora estamos utilizando o valor do useState
                onChangeText={setEmail}  // Atualiza o estado do email
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-white"
                placeholder="Email"
                placeholderTextColor="white"
              />
            </View>

            {/* senha input */}
            
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
              

            {/* login botão */}

          <View>
            {
              loading? (
                <View className="flex-row justify-center">
                  <Loading size={hp(9)}/>
                </View>
              ):( 
              <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.5) }} className="bg-zinc-100 rounded-xl justify-center items-center">
              <Text style={{ fontSize: hp(2.7) }} className="text-slate font-bold tracking-wider">
                 Registrar
              </Text>
            </TouchableOpacity>
              )
            }
          </View>

            

            {/* signup botão */}
            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-100 ">Ja tem uma conta?</Text>
              <Pressable onPress={() => router.push('signIn')}>
                <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-green-200 "> Faça Login</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
    </CustomKeyboardView>
  </BackgroundImage>
  );
}