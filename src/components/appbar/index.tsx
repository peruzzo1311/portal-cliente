import { useAppSelector } from '@/store/hooks'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Image, Text, XStack } from 'tamagui'
import ModalMenu from './modal-menu'

export default function AppBar({ navigation }: any) {
  const user = useAppSelector(state => state.user)

  return (
    <XStack
      alignItems='center'
      justifyContent='space-between'
      backgroundColor={'#fff'}
      paddingVertical={'$2'}
      paddingHorizontal={'$4'}
      borderBottomWidth={1}
      borderBottomColor={'$borderColor'}
    >
      <ModalMenu navigation={navigation} />

      <Image
        source={require('@/assets/images/icon.png')}
        width={60}
        height={60}
        resizeMode='contain'
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile', { user })
        }}
      >
        <Avatar
          circular
          borderWidth={2}
          borderColor={'$primary7'}
        >
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
  )
}
