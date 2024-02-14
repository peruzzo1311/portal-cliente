import Romaneio from '@/types/romaneio'
import { Check, ChevronDown } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  AnimatePresence,
  Button,
  Card,
  Dialog,
  Label,
  ListItem,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui'
import { AnimatedYStack } from '../tab-animated'

export default function GraphRomaneios({
  romaneios,
}: {
  romaneios: Romaneio[]
}) {
  const [selectedSafra, setSelectedSafra] = useState('')
  const [romaneiosListItems, setRomaneiosListItems] =
    useState([] as Romaneio[])
  const [open, setOpen] = useState(false)

  const onChangeSelectedSafra = (safra: string) => {
    setSelectedSafra(safra)
    setOpen(false)
  }

  const safraOptions = () => {
    const options = romaneios.map(
      romaneio => romaneio.codSaf
    )

    const uniqueOptions = [...new Set(options)]

    return uniqueOptions.map(option => (
      <TouchableOpacity
        key={option}
        onPress={() => onChangeSelectedSafra(option)}
      >
        <XStack
          onPress={() => setSelectedSafra(option)}
          alignItems='center'
          paddingVertical={'$3'}
        >
          <Text>{option}</Text>

          {selectedSafra === option && (
            <View marginLeft={'auto'}>
              <Check size={20} />
            </View>
          )}
        </XStack>
      </TouchableOpacity>
    ))
  }

  useEffect(() => {
    const uniqueSafras = [
      ...new Set(
        romaneios.map(romaneio => romaneio.codSaf)
      ),
    ]

    setSelectedSafra(uniqueSafras[0])
  }, [romaneios])

  useEffect(() => {
    if (selectedSafra) {
      const filteredRomaneios = romaneios
        .filter(
          romaneio => romaneio.codSaf === selectedSafra
        )
        .reduce<Romaneio[]>((acc, romaneio) => {
          const foundIndex = acc.findIndex(
            item => item.codPro === romaneio.codPro
          )

          if (foundIndex !== -1) {
            acc[foundIndex].qtdAbe += romaneio.qtdAbe
          } else {
            acc.push({ ...romaneio })
          }

          return acc
        }, [])

      setRomaneiosListItems(filteredRomaneios)
    }
  }, [selectedSafra])

  return (
    <Card
      borderWidth={1}
      borderColor={'$borderColor'}
      borderTopWidth={5}
      borderTopColor={'$primary7'}
      backgroundColor={'#FFF'}
      padding={'$1'}
    >
      <Card.Header>
        <XStack alignItems='center' space>
          <Label fontSize={'$5'}>Safra:</Label>

          <Button
            iconAfter={ChevronDown}
            backgroundColor={'#FFF'}
            borderWidth={1}
            borderColor={'#ddd'}
            onPress={() => setOpen(true)}
          >
            <Text>
              {selectedSafra ?? 'Selecione uma safra'}
            </Text>
          </Button>
        </XStack>

        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay
              key='overlay'
              animation='quick'
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              onPress={() => setOpen(false)}
            />

            <Dialog.Content
              bordered
              elevate
              key='content'
              animateOnly={['transform', 'opacity']}
              animation={[
                'quick',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{
                x: 0,
                y: -20,
                opacity: 0,
                scale: 0.9,
              }}
              exitStyle={{
                x: 0,
                y: 10,
                opacity: 0,
                scale: 0.95,
              }}
              gap='$4'
              width={300}
              backgroundColor={'#FFF'}
            >
              <Text fontWeight={'bold'} fontSize={'$6'}>
                Selecione uma safra
              </Text>

              <YStack
                separator={<Separator />}
                space={'$1'}
              >
                {safraOptions()}
              </YStack>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </Card.Header>

      <Separator />

      <AnimatePresence
        exitBeforeEnter
        enterVariant={'isLeft'}
        exitVariant={'isRight'}
      >
        <AnimatedYStack
          key={selectedSafra}
          animation={'200ms'}
          x={0}
          opacity={1}
        >
          <YStack separator={<Separator />}>
            {romaneiosListItems.map(romaneio => (
              <ListItem
                key={romaneio.codPro}
                title={romaneio.desPro}
                subTitle={romaneio.qtdAbe.toString()}
              />
            ))}
          </YStack>
        </AnimatedYStack>
      </AnimatePresence>
    </Card>
  )
}
