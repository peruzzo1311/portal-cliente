import ContratoCompra from '@/types/contratos'
import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, XStack, YStack } from 'tamagui'

interface Props {
  item: ContratoCompra
}

export const ContractListItem = ({ item }: Props) => {
  const navigation = useNavigation() as any

  const handleNavigation = () => {
    navigation.navigate('ContractsDetails', {
      item,
    })
  }

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <XStack
        justifyContent='space-between'
        alignItems='center'
        backgroundColor={'#FFF'}
      >
        <YStack space={'$1.5'}>
          <Text fontWeight={'700'}>{item.codFor}</Text>

          <Text fontSize={'$3'} color={'$text-secondary'}>
            {item.codPro} - {item.cplCcp}
          </Text>

          <Text fontSize={'$3'} color={'$text-secondary'}>
            Quantidade: {`${item.qtdFor} ${item.uniMed}`}
          </Text>

          <Text fontSize={'$3'} color={'$text-secondary'}>
            Depósito: {item.codDep}
          </Text>
        </YStack>

        <YStack marginRight={'$4'}>
          <ChevronRight
            size={24}
            color={'$text-secondary'}
          />
        </YStack>
      </XStack>
    </TouchableOpacity>
  )
}

export default memo(ContractListItem)
