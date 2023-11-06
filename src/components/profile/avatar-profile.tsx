import { useAppSelector } from '@/store/hooks'
import { Avatar, Text, YStack } from 'tamagui'

export default function AvatarProfile() {
  const user = useAppSelector((state) => state.user)

  return (
    <YStack
      justifyContent='center'
      alignItems='center'
      space={'$2'}
      margin={'$4'}
    >
      <Avatar circular size={120}>
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
            delayMs={1000}
          >
            <Text color={'$text-primary'} fontWeight={'700'} fontSize={'$11'}>
              {user.fullName[0].toUpperCase()}
            </Text>
          </Avatar.Fallback>
        )}
      </Avatar>

      <Text
        fontWeight={'700'}
        color={'$text-primary'}
        textTransform='capitalize'
        fontSize={'$7'}
      >
        {user.fullName}
      </Text>
    </YStack>
  )
}
