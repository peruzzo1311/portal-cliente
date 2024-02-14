import Romaneio from '@/types/romaneio'
import { Check } from '@tamagui/lucide-icons'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
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
  romaneios: Romaneio[]
  setRomaneiosFiltered: Dispatch<SetStateAction<Romaneio[]>>
}

export default function RomaneiosFilterModal({
  open,
  setOpen,
  romaneios,
  setRomaneiosFiltered,
}: Props) {
  const [nomeFornecedor, setNomeFornecedor] = useState('')
  const [codigoProduto, setCodigoProduto] = useState('')
  const [descricaoProduto, setDescricaoProduto] =
    useState('')
  const [codigoSafra, setCodigoSafra] = useState<string[]>(
    []
  )
  const [safras, setSafras] = useState<string[]>([])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNomeFornecedor('')
      setCodigoProduto('')
      setDescricaoProduto('')
      setCodigoSafra([])
      Keyboard.dismiss()
    }

    setOpen(open)
  }

  const getUniqueSafras = () => {
    const safras = romaneios.map(
      romaneio => romaneio.codSaf
    )
    const uniqueSafras = Array.from(new Set(safras))

    setSafras(uniqueSafras)
  }

  const handleChangeCodigoSafra = (safra: string) => {
    const index = codigoSafra.indexOf(safra)

    if (index === -1) {
      setCodigoSafra([...codigoSafra, safra])
    } else {
      setCodigoSafra([
        ...codigoSafra.slice(0, index),
        ...codigoSafra.slice(index + 1),
      ])
    }
  }

  const handleFilter = () => {
    const filteredRomaneios = romaneios.filter(
      romaneio =>
        (nomeFornecedor
          ? romaneio.nomFor
              .toLowerCase()
              .includes(nomeFornecedor.toLowerCase())
          : true) &&
        (codigoProduto
          ? romaneio.codPro
              .toString()
              .toLowerCase()
              .includes(
                codigoProduto.toString().toLowerCase()
              )
          : true) &&
        (descricaoProduto
          ? romaneio.desPro
              .toLowerCase()
              .includes(descricaoProduto.toLowerCase())
          : true) &&
        (codigoSafra.length > 0
          ? codigoSafra.includes(romaneio.codSaf)
          : true)
    )

    setRomaneiosFiltered(filteredRomaneios)
    handleOpenChange(false)
  }

  useEffect(() => {
    getUniqueSafras()
  }, [romaneios])

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={handleOpenChange}
      dismissOnSnapToBottom={true}
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
              <Paragraph
                fontWeight={'700'}
                color={'$text-secondary'}
              >
                Nome do fornecedor
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite o nome do fornecedor'
                onChangeText={setNomeFornecedor}
              />
            </YStack>

            <YStack>
              <Paragraph
                fontWeight={'700'}
                color={'$text-secondary'}
              >
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

            <YStack>
              <Paragraph
                fontWeight={'700'}
                color={'$text-secondary'}
              >
                Descrição do produto
              </Paragraph>

              <Input
                backgroundColor={'#FFF'}
                borderWidth={'$1'}
                borderColor={'$primary7'}
                size={'$5'}
                placeholder='Digite a descrição/nome do produto'
                onChangeText={setDescricaoProduto}
              />
            </YStack>

            {safras.length > 0 && (
              <YStack>
                <Paragraph
                  fontWeight={'700'}
                  color={'$text-secondary'}
                >
                  Safras
                </Paragraph>

                <YStack space>
                  {safras.map((safra, index) => (
                    <XStack
                      key={safra}
                      alignItems='center'
                      space={'$2'}
                    >
                      <Checkbox
                        id={index.toString()}
                        borderWidth={2}
                        onCheckedChange={() =>
                          handleChangeCodigoSafra(safra)
                        }
                        checked={codigoSafra.includes(
                          safra
                        )}
                        backgroundColor={
                          codigoSafra.includes(safra)
                            ? '$primary7'
                            : '#fff'
                        }
                        borderColor={
                          codigoSafra.includes(safra)
                            ? '$primary7'
                            : '#ddd'
                        }
                      >
                        <Checkbox.Indicator>
                          <Check color={'#fff'} />
                        </Checkbox.Indicator>
                      </Checkbox>

                      <Label htmlFor={index.toString()}>
                        {safra}
                      </Label>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            )}
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
