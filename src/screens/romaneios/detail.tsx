import Romaneio from '@/types/romaneio'
import { RouteProp } from '@react-navigation/native'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { Button, Text, View, XStack, YStack } from 'tamagui'

interface Props {
  route: RouteProp<
    {
      params: {
        item: Romaneio
      }
    },
    'params'
  >
  navigation: any
}

export default function RomaneiosDetail({
  route,
  navigation,
}: Props) {
  const { item } = route.params

  return (
    <View flex={1} backgroundColor={'#FFF'}>
      <XStack
        alignItems='center'
        backgroundColor={'#fff'}
        paddingVertical={'$3'}
        paddingHorizontal={'$4'}
        borderBottomWidth={1}
        borderBottomColor={'$borderColor'}
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
          Romaneio
        </Text>
      </XStack>

      <YStack
        flex={1}
        padding={'$4'}
        backgroundColor={'#FFF'}
        gap={'$4'}
      >
        <XStack>
          <YStack width={'50%'}>
            <Text fontWeight={'700'}>FORNECEDOR</Text>

            <Text>{item.nomFor}</Text>
          </YStack>

          <YStack>
            <Text fontWeight={'700'}>SAFRA</Text>

            <Text>{item.codSaf}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'100%'}>
            <Text fontWeight={'700'}>PRODUTO</Text>

            <Text>
              {item.codPro} - {item.desPro}
            </Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'50%'}>
            <Text fontWeight={'700'}>
              QUANTIDADE PEDIDA
            </Text>

            <Text>{item.qtdPed}</Text>
          </YStack>

          <YStack>
            <Text fontWeight={'700'}>
              QUANTIDADE RECEBIDA
            </Text>

            <Text>{item.qtdRec}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'50%'}>
            <Text fontWeight={'700'}>
              QUANTIDADE CANCELADA
            </Text>

            <Text>{item.qtdCan}</Text>
          </YStack>

          <YStack>
            <Text fontWeight={'700'}>
              QUANTIDADE EM ABERTO
            </Text>

            <Text>{item.qtdAbe}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'100%'}>
            <Text fontWeight={'700'}>FAMÍLIA</Text>

            <Text>
              {item.codFam} - {item.desFam}
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </View>
  )
}
