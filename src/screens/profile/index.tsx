import AvatarProfile from '@/components/profile/avatar-profile'
import UserInfo from '@/components/profile/user-info'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import { ArrowLeft, LogOut } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import React, { useEffect } from 'react'
import { Button, ScrollView, Separator, Text, View, XStack } from 'tamagui'

type Props = {
  navigation: StackNavigationProp<Record<string, object>>
}

export default function ProfileScreen({ navigation }: Props) {
  const user = useAppSelector((state) => state.user)
  const toast = useToastController()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user')

    dispatch({
      type: 'user/clearUser',
    })

    navigation.replace('Login', {})
  }

  if (!user) {
    navigation.replace('Login', {})

    return
  }

  useEffect(() => {
    toast.hide()
  }, [])

  return (
    <View flex={1} backgroundColor={'#fff'}>
      <XStack
        alignItems='center'
        backgroundColor={'#fff'}
        paddingVertical={'$2'}
        paddingHorizontal={'$4'}
      >
        <Button
          icon={ArrowLeft}
          backgroundColor={'$primary7'}
          scaleIcon={2}
          width={50}
          color={'$text-white'}
          onPress={() => navigation.goBack()}
        />

        <Text
          fontSize={'$7'}
          fontWeight={'700'}
          marginLeft={'$2'}
          color={'$primary7'}
        >
          Perfil
        </Text>
      </XStack>

      <ScrollView
        marginBottom={100}
        flex={1}
        backgroundColor={'$appBackground'}
      >
        <AvatarProfile />

        <Separator />

        <UserInfo />
      </ScrollView>

      <View position='absolute' bottom={'$4'} right={'$8'} left={'$8'}>
        <Button
          backgroundColor={'$red10'}
          color={'$text-white'}
          fontWeight={'700'}
          fontSize={20}
          scaleIcon={1.5}
          size={'$5'}
          icon={LogOut}
          onPress={handleLogout}
        >
          Sair
        </Button>
      </View>
    </View>
  )
}
