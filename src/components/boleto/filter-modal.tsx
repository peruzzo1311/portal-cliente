import Titulo from '@/types/Titulo'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Keyboard } from 'react-native'
import {
  Button,
  H4,
  Input,
  Paragraph,
  ScrollView,
  Sheet,
  View,
  YStack,
} from 'tamagui'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  boletos: Titulo[]
  setBoletosFiltered: Dispatch<SetStateAction<Titulo[]>>
}

type TituloKeys = 'numTit' | 'vctPro'

export default function BoletosFilterModal({
  open,
  setOpen,
  boletos,
  setBoletosFiltered,
}: Props) {
  const [numeroTitulo, setNumeroTitulo] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [valor, setValor] = useState(0)

  const resetFilters = () => {
    setNumeroTitulo('')
    setDataVencimento('')
    setValor(0)
    Keyboard.dismiss()
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetFilters()
    }

    setOpen(open)
  }

  const matchFilter = (boleto: Titulo, filter: string, prop: TituloKeys) => {
    return filter.length > 0 ? boleto[prop].includes(filter) : true
  }

  const handleFilter = () => {
    const filtered = boletos.filter((boleto) => {
      const numeroTituloMatch = matchFilter(boleto, numeroTitulo, 'numTit')
      const dataVencimentoMatch = matchFilter(boleto, dataVencimento, 'vctPro')
      const valorMatch = valor > 0 ? boleto.vlrAbe === valor : true

      return numeroTituloMatch && dataVencimentoMatch && valorMatch
    })

    Keyboard.dismiss()
    setBoletosFiltered(filtered)
    setOpen(false)
  }

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={handleOpenChange}
      dismissOnSnapToBottom
      animation={'quick'}
    >
      <Sheet.Overlay
        animation='lazy'
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Frame backgroundColor={'#FFF'}>
        <ScrollView>
          <View padding={'$4'}>
            <Sheet.Handle backgroundColor={'$primary7'} />
          </View>

          <YStack flex={1} padding={'$4'} gap={'$4'}>
            <H4>Filtrar por:</H4>

            <YStack>
              <Paragraph fontWeight={'700'} color={'$text-secondary'}>
                Número do título
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite o número do título'
                onChangeText={setNumeroTitulo}
              />
            </YStack>

            <YStack>
              <Paragraph fontWeight={'700'} color={'$text-secondary'}>
                Data de vencimento
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite a data de vencimento'
                onChangeText={setDataVencimento}
              />
            </YStack>

            <YStack>
              <Paragraph fontWeight={'700'} color={'$text-secondary'}>
                Valor
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite o valor do título'
                onChangeText={(text) => setValor(Number(text))}
              />
            </YStack>
          </YStack>
        </ScrollView>

        <Button
          backgroundColor={'$primary7'}
          color={'$text-white'}
          fontWeight={'bold'}
          fontSize={20}
          scaleIcon={1.5}
          size={'$5'}
          margin={'$4'}
          marginBottom={'$6'}
          onPress={handleFilter}
        >
          Aplicar
        </Button>
      </Sheet.Frame>
    </Sheet>
  )
}
