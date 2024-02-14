import { ArrowLeft } from '@tamagui/lucide-icons'
import { Button, Text, View, XStack, YStack } from 'tamagui'

interface Props {
  route: any
  navigation: any
}

export default function ContractsDetails({
  route,
  navigation,
}: Props) {
  const { item } = route.params

  const getValorizacao = (tipoValorizacao: number) => {
    switch (tipoValorizacao) {
      case 1:
        return 'Valorização fixa'
      case 2:
        return 'Valorização variável'
      default:
        return 'Valorização não informada'
    }
  }

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
            <Text fontWeight={'700'}>N° CONTRATO</Text>

            <Text>{item.numCtr}</Text>
          </YStack>

          <YStack>
            <Text fontWeight={'700'}>FORNECEDOR</Text>

            <Text>{item.codFor}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'100%'}>
            <Text fontWeight={'700'}>VALORIZAÇÃO</Text>

            <Text>{getValorizacao(item.tipVlz)}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'50%'}>
            <Text fontWeight={'700'}>MOEDA</Text>

            <Text>{item.codMoe}</Text>
          </YStack>

          <YStack>
            <Text fontWeight={'700'}>SAFRA</Text>

            <Text>{item.codSaf}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'50%'}>
            <Text fontWeight={'700'}>Depósito</Text>

            <Text>{item.codDep}</Text>
          </YStack>

          <YStack>
            <Text fontWeight={'700'}>DATA EMISSÃO</Text>

            <Text>{item.datEmi}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'50%'}>
            <Text fontWeight={'700'}>PREÇO UN.</Text>

            <Text>
              {item.preUni.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </YStack>

          <YStack>
            <Text fontWeight={'700'}>QUANTIDADE</Text>

            <Text>{item.qtdFor}</Text>
          </YStack>
        </XStack>

        <XStack>
          <YStack width={'100%'}>
            <Text fontWeight={'700'}>PRODUTO</Text>

            <Text>
              {item.codPro} - {item.cplCcp}
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </View>
  )
}
