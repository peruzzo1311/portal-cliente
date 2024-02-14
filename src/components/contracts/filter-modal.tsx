import ContratoCompra from '@/types/contratos'
import { Check } from '@tamagui/lucide-icons'
import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react'
import { Keyboard } from 'react-native'
import {
  Button,
  Checkbox,
  H4,
  Input,
  Label,
  Paragraph,
  ScrollView,
  Sheet,
  View,
  XStack,
  YStack,
} from 'tamagui'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  contratos: ContratoCompra[]
  setContratosFiltered: Dispatch<
    SetStateAction<ContratoCompra[]>
  >
}

type TipoValorizacao =
  | 'Valorização Fixa'
  | 'Valorização Variável'
  | ''

export default function ContractsFilterModal({
  open,
  setOpen,
  contratos,
  setContratosFiltered,
}: Props) {
  const [tipoValorizacao, setTipoValorizacao] =
    useState<TipoValorizacao>('')
  const [numeroContrato, setNumeroContrato] = useState('')
  const [codigoFornecedor, setCodigoFornecedor] =
    useState('')
  const [codigoProduto, setCodigoProduto] = useState('')

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNumeroContrato('')
      setCodigoFornecedor('')
      setCodigoProduto('')

      Keyboard.dismiss()
    }

    setOpen(open)
  }

  const handleFilter = () => {
    let filtered = contratos

    if (numeroContrato) {
      filtered = filtered.filter(
        contrato =>
          contrato.numCtr === Number(numeroContrato)
      )
    }

    if (codigoFornecedor) {
      filtered = filtered.filter(
        contrato =>
          contrato.codFor === Number(codigoFornecedor)
      )
    }

    if (codigoProduto) {
      filtered = filtered.filter(
        contrato => contrato.codPro === codigoProduto
      )
    }

    if (tipoValorizacao) {
      filtered = filtered.filter(contrato => {
        switch (tipoValorizacao) {
          case 'Valorização Fixa':
            return contrato.tipVlz === 1
          case 'Valorização Variável':
            return contrato.tipVlz === 2
          default:
            return true
        }
      })
    }

    setContratosFiltered(filtered)
    handleOpenChange(false)
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
              <Paragraph color={'$text-secondary'}>
                Número do contrato
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite o número do contrato'
                value={numeroContrato}
                onChangeText={setNumeroContrato}
              />
            </YStack>

            <YStack>
              <Paragraph color={'$text-secondary'}>
                Código do produto
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite o código do produto'
                onChangeText={setCodigoProduto}
              />
            </YStack>

            <YStack space>
              <Paragraph color={'$text-secondary'}>
                TIPO DE VALORIZAÇÃO
              </Paragraph>

              <XStack alignItems='center' space>
                <Checkbox
                  id='valorizacaoFixa'
                  borderWidth={2}
                  onCheckedChange={() =>
                    setTipoValorizacao('Valorização Fixa')
                  }
                  checked={
                    tipoValorizacao === 'Valorização Fixa'
                  }
                  backgroundColor={
                    tipoValorizacao === 'Valorização Fixa'
                      ? '$primary7'
                      : '#fff'
                  }
                  borderColor={
                    tipoValorizacao === 'Valorização Fixa'
                      ? '$primary7'
                      : '#ddd'
                  }
                  pressStyle={{ scale: 0.9 }}
                  animation={'bouncy'}
                >
                  <Checkbox.Indicator>
                    <Check color={'#fff'} />
                  </Checkbox.Indicator>
                </Checkbox>

                <Label
                  htmlFor='valorizacaoFixa'
                  fontSize={16}
                >
                  Valorização Fixa
                </Label>
              </XStack>

              <XStack alignItems='center' space>
                <Checkbox
                  id='valorizacaoVariavel'
                  borderWidth={2}
                  onCheckedChange={() =>
                    setTipoValorizacao(
                      'Valorização Variável'
                    )
                  }
                  checked={
                    tipoValorizacao ===
                    'Valorização Variável'
                  }
                  backgroundColor={
                    tipoValorizacao ===
                    'Valorização Variável'
                      ? '$primary7'
                      : '#fff'
                  }
                  borderColor={
                    tipoValorizacao ===
                    'Valorização Variável'
                      ? '$primary7'
                      : '#ddd'
                  }
                  pressStyle={{ scale: 0.9 }}
                  animation={'bouncy'}
                >
                  <Checkbox.Indicator>
                    <Check color={'#fff'} />
                  </Checkbox.Indicator>
                </Checkbox>

                <Label
                  htmlFor='valorizacaoVariavel'
                  fontSize={16}
                >
                  Valorização Variável
                </Label>
              </XStack>
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
