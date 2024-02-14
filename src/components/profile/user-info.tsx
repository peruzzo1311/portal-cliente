import { useAppSelector } from '@/store/hooks'
import { Separator, Text, YStack } from 'tamagui'

export default function UserInfo() {
  const user = useAppSelector(state => state.user)

  const getCodcli = () => {
    const codcli = user.properties.find(
      property => property.name.toLowerCase() === 'codcli'
    )

    if (codcli) {
      return codcli.value
    }
  }

  return (
    <YStack
      flex={1}
      space={'$4'}
      padding={'$4'}
      separator={<Separator />}
    >
      <YStack>
        <Text
          fontWeight={'700'}
          color={'$text-primary'}
          fontSize={'$5'}
        >
          Email
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {user.email}
        </Text>
      </YStack>

      <YStack>
        <Text
          fontWeight={'700'}
          color={'$text-primary'}
          fontSize={'$5'}
        >
          Nome
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {user.fullName}
        </Text>
      </YStack>

      <YStack>
        <Text
          fontWeight={'700'}
          color={'$text-primary'}
          fontSize={'$5'}
        >
          Tenant
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {user.tenantDomain}
        </Text>
      </YStack>

      <YStack>
        <Text
          fontWeight={'700'}
          color={'$text-primary'}
          fontSize={'$5'}
        >
          Código de cliente
        </Text>

        <Text fontWeight={'700'} color={'$text-secondary'}>
          {getCodcli()}
        </Text>
      </YStack>
    </YStack>
  )
}
