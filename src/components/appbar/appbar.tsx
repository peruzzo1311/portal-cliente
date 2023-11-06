import { useAppSelector } from '@/store/hooks'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Image, Text, XStack } from 'tamagui'
import ModalMenu from './modal-menu'

type Props = {
  navigation: DrawerNavigationProp<Record<string, object>>
}

export default function AppBar({ navigation }: Props) {
  const user = useAppSelector((state) => state.user)

  return (
    <XStack
      alignItems='center'
      justifyContent='space-between'
      backgroundColor={'$primary7'}
      paddingVertical={'$2'}
      paddingHorizontal={'$4'}
      elevation={4}
    >
      <Image
        source={require('@/assets/images/logo.png')}
        width={175}
        height={'100%'}
        resizeMode='contain'
      />

      <XStack justifyContent='center' alignItems='center' gap={'$4'}>
        <ModalMenu navigation={navigation} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', { user })
          }}
        >
          <Avatar circular pressStyle={{ scale: 0.8, opacity: 0.1 }}>
            {user.photoUrl ? (
              <Avatar.Image
                accessibilityLabel={user.fullName}
                src={user.photoUrl}
              />
            ) : (
              <Avatar.Fallback
                bc={'#ccc'}
                justifyContent='center'
                alignItems='center'
              >
                <Text
                  color={'$text-primary'}
                  fontWeight={'700'}
                  fontSize={'$7'}
                >
                  {user.fullName[0].toUpperCase()}
                </Text>
              </Avatar.Fallback>
            )}
          </Avatar>
        </TouchableOpacity>
      </XStack>
    </XStack>
  )
}
