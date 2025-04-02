import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../../utils/common";
import { useAuth } from "../../context/authContext"; 
import * as ImagePicker from 'expo-image-picker'; // Importando o ImagePicker
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebaseConfig'; // Importe seu Firebase Storage e Firestore

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useAuth(); // Supondo que você tenha uma função setUser para atualizar o usuário no contexto

  const [fullname, setFullname] = useState(user?.fullname);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [profileImage, setProfileImage] = useState(user?.profileImage);

  // Função para enviar a imagem para o Firebase Storage e atualizar a URL no Firestore
  const uploadImage = async (uri) => {
    console.log("URI recebida na função uploadImage:", uri); // Verificar se a URI foi recebida corretamente
    
    // Verifica se a URI não é válida
    if (!uri) {
      Alert.alert("Erro", "Por favor, selecione uma imagem.");
      return;
    }

    // Se a URI for válida, prossegue com o upload da imagem
    try {
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, "profile_images/" + fileName);
      
      // Converte a URI em um arquivo para o upload
      const img = await fetch(uri);
      const bytes = await img.blob();
      
      const uploadTask = uploadBytesResumable(storageRef, bytes);
      
      uploadTask.on("state_changed", 
        (snapshot) => {
          // Progress handling (opcional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso: ${progress}%`);
        },
        (error) => {
          Alert.alert("Erro", error.message);
        },
        async () => {
          // Obter a URL da imagem após o upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("URL da imagem:", downloadURL);

          // Atualizar a URL da imagem no Firestore
          await updateDoc(doc(db, "users", user.uid), {
            profileImage: downloadURL
          });

          // Atualizar o estado com a nova URL da imagem
          setProfileImage(downloadURL);

          // Opcional: Atualizar o usuário no contexto ou na UI
          setUser({
            ...user,
            profileImage: downloadURL
          });

          // Confirmação de que a imagem foi carregada com sucesso
          Alert.alert("Sucesso", "Sua imagem de perfil foi atualizada!");
        }
      );
    } catch (error) {
      console.log("Erro ao fazer o upload da imagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar a imagem.");
    }
  };

  const pickImage = async () => {
  // Solicita permissões de acesso à galeria
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Você precisa permitir o acesso à galeria.");
    return;
  }

  // Permite ao usuário escolher uma imagem
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // A opção correta para imagens
    allowsEditing: true, // Permite que o usuário edite a imagem após escolher
    aspect: [4, 4], // Aspect ratio para a imagem (opcional)
    quality: 1, // Qualidade máxima
  });

  // Verifica se o usuário não cancelou a escolha e se a URI da imagem não está vazia
  if (!result.canceled && result.assets && result.assets[0]?.uri) {
    const imageUri = result.assets[0].uri;
    console.log("Imagem selecionada:", imageUri); // Verificar o valor da URI

    // Chama a função de upload com a URI da imagem
    uploadImage(imageUri); // Faz o upload da imagem para o Firebase
  } else {
    console.log("Usuário cancelou ou não foi possível obter a URI da imagem.");
  }
};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Foto do Perfil */}
        <View className="items-center mb-6">
          <Image
            style={{
              height: hp(15),
              width: hp(15),
              borderRadius: hp(7.5),
            }}
            source={profileImage || { uri: "https://picsum.photos/id/237/200/300" }} // Usa a foto do usuário, se disponível
            placeholder={{ blurhash }}
            transition={200}
          />
          <TouchableOpacity className="mt-2" onPress={pickImage}>
            <Text className="text-blue-500">Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Campos de Edição */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 mb-1">Nome Completo</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={fullname}
              onChangeText={setFullname}
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-1">Nome de Usuário</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-1">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            className="bg-green-500 rounded-lg p-4 items-center mt-6"
            onPress={async () => {
              // Atualiza o usuário no Firestore com os dados editados
              const userRef = doc(db, 'users', user.uid);
              await updateDoc(userRef, {
                fullname,
                username,
                email,
              });

              // Atualiza o estado local com as novas informações
              setUser({
                ...user,
                fullname,
                username,
                email,
                profileImage,
              });

              router.back();
            }}
          >
            <Text className="text-white font-semibold text-lg">Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
