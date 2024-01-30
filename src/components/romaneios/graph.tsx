import Romaneio from '@/types/romaneio'
import { Check, ChevronDown } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes'
import {
  Button,
  Card,
  Dialog,
  Label,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui'

const chartConfig: AbstractChartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  barPercentage: 0.8,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 119, 189, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  useShadowColorFromDataset: false,
}

export default function GraphRomaneios({
  romaneios,
}: {
  romaneios: Romaneio[]
}) {
  const [selectedSafra, setSelectedSafra] = useState('')
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

  const chartData: ChartData = {
    labels: [
      ...new Set(
        romaneios
          .filter(
            romaneio => romaneio.codSaf === selectedSafra
          )
          .map(romaneio => romaneio.codPro)
      ),
    ],
    datasets: [
      {
        data: romaneios
          .filter(
            romaneio => romaneio.codSaf === selectedSafra
          )
          .reduce<Romaneio[]>((acc, obj) => {
            const foundIndex = acc.findIndex(
              item => item.codPro === obj.codPro
            )

            if (foundIndex !== -1) {
              acc[foundIndex].qtdAbe += obj.qtdAbe
            } else {
              acc.push({ ...obj })
            }

            return acc
          }, [])
          .map(romaneio => romaneio.qtdAbe),
      },
    ],
  }

  useEffect(() => {
    const uniqueSafras = [
      ...new Set(
        romaneios.map(romaneio => romaneio.codSaf)
      ),
    ]

    setSelectedSafra(uniqueSafras[0])
  }, [romaneios])

  return (
    <Card
      borderWidth={1}
      borderColor={'$borderColor'}
      padding={'$1'}
      backgroundColor={'#FFF'}
    >
      <Card.Header>
        <XStack alignItems='center' space>
          <Label>Safra:</Label>

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

      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 50}
        height={220}
        chartConfig={chartConfig}
        fromZero
        yAxisLabel=''
        yAxisSuffix=''
      />
    </Card>
  )
}
