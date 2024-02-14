import Romaneio from '@/types/romaneio'
import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, XStack, YStack } from 'tamagui'

type Props = {
  item: Romaneio
}

const RomaneiosFlatlistComponent = ({ item }: Props) => {
  const navigation = useNavigation() as any

  const handleNavigation = () => {
    navigation.navigate('RomaneioDetail', {
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
          <Text fontWeight={'700'}>{item.nomFor}</Text>

          <Text fontSize={'$3'} color={'$text-secondary'}>
            {item.codPro} - {item.desPro}
          </Text>

          <Text fontSize={'$3'} color={'$text-secondary'}>
            Quantidade: {item.qtdPed}
          </Text>

          <Text fontSize={'$3'} color={'$text-secondary'}>
            Safra: {item.codSaf}
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

export default memo(RomaneiosFlatlistComponent)
