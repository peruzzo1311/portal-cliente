import NotaFiscal from '@/types/nota-fiscal'
import { Dispatch, SetStateAction, useState } from 'react'
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
  notas: NotaFiscal[]
  setNotasFiltered: Dispatch<SetStateAction<NotaFiscal[]>>
}

export default function NotasFilterModal({
  open,
  setOpen,
  notas,
  setNotasFiltered,
}: Props) {
  const [numeroNota, setNumeroNota] = useState('')
  const [nomeCliente, setNomeCliente] = useState('')
  const [dataAutorizacao, setDataAutorizacao] = useState('')

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNumeroNota('')
      setNomeCliente('')
      setDataAutorizacao('')
      Keyboard.dismiss()
    }

    setOpen(open)
  }

  const handleFilter = () => {
    const filtered = notas.filter((nota) => {
      const numeroNotaMatch =
        numeroNota.length > 0
          ? nota.numNfv.toString().includes(numeroNota)
          : true

      const nomeClienteMatch =
        nomeCliente.length > 0 ? nota.nomCli.includes(nomeCliente) : true

      const dataAutorizacaoMatch =
        dataAutorizacao.length > 0
          ? nota.datAut.includes(dataAutorizacao)
          : true

      return numeroNotaMatch && nomeClienteMatch && dataAutorizacaoMatch
    })

    Keyboard.dismiss()
    setNotasFiltered(filtered)
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
                Número da nota
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite o número da nota'
                onChangeText={setNumeroNota}
              />
            </YStack>

            <YStack>
              <Paragraph fontWeight={'700'} color={'$text-secondary'}>
                Data de autorização
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite a data de autorização da nota'
                onChangeText={setDataAutorizacao}
              />
            </YStack>

            <YStack>
              <Paragraph fontWeight={'700'} color={'$text-secondary'}>
                Nome do cliente
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite o nome do cliente'
                onChangeText={setNomeCliente}
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
