import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { blurhash } from '../utils/common'

const ios = Platform.OS === 'ios'

export default function HomeHeader() {
  const { top } = useSafeAreaInsets()

  return (
    <View style={{ paddingTop: ios ? top : top + 10 }} className="flex-row justify-between px-6 bg-green-500 pb-6 rounded-b-3xl shadow">
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">Finder</Text>
      </View>

      {/* Imagem do usuário */}
      <View>
        <Image 
          style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
          source="https://picsum.photos/id/237/200/300"
          placeholder={{ blurhash }}
          transition={200}
        />
      </View>
    </View>
  )
}