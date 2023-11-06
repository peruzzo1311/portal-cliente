import { useAppSelector } from '@/store/hooks'
import { useCallback } from 'react'
import { Separator, Text, YStack } from 'tamagui'

export default function UserInfo() {
  const renderSeparator = useCallback(() => <Separator />, [])
  const user = useAppSelector((state) => state.user)

  return (
    <YStack flex={1} space={'$4'} padding={'$4'} separator={renderSeparator()}>
      <YStack>
        <Text fontWeight={'700'} color={'$text-primary'} fontSize={'$5'}>
          Email
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {user.email}
        </Text>
      </YStack>

      <YStack>
        <Text fontWeight={'700'} color={'$text-primary'} fontSize={'$5'}>
          Nome
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {user.fullName}
        </Text>
      </YStack>

      <YStack>
        <Text fontWeight={'700'} color={'$text-primary'} fontSize={'$5'}>
          Tenant
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {user.tenantDomain}
        </Text>
      </YStack>

      <YStack>
        <Text fontWeight={'700'} color={'$text-primary'} fontSize={'$5'}>
          Clientes
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {user.properties.map((property) => property.value).join(', ')}
        </Text>
      </YStack>
    </YStack>
  )
}
