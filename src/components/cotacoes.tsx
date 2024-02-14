import { exportaCotacoes } from '@/api/cotacoes'
import { useAppSelector } from '@/store/hooks'
import Cotacoes from '@/types/cotacoes'
import { Suspense, useEffect, useState } from 'react'
import {
  Card,
  Image,
  Separator,
  Text,
  XStack,
  YStack,
} from 'tamagui'

const iconCard = (cotacao: Cotacoes) => {
  let icon

  switch (cotacao.codMoe) {
    case '05':
      icon = require('@/assets/icons/soja.png')
      break
    case 'MIL':
      icon = require('@/assets/icons/milho.png')
      break
    case 'TRI':
      icon = require('@/assets/icons/trigo.png')
      break
  }

  return <Image source={icon} width={30} height={30} />
}

export default function CardsCotacoes() {
  const [cotacoes, setCotacoes] = useState([] as Cotacoes[])
  const [hasError, setHasError] = useState(false)

  const properties = useAppSelector(
    state => state.userProperties
  )

  const getData = async () => {
    const dataInicio = new Date()
      .toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      .split('T')[0]
    const dataFim = new Date()
      .toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      .split('T')[0]

    const data = await exportaCotacoes(
      dataInicio,
      dataFim,
      properties
    )

    if (data.codRet !== 0) {
      setHasError(true)
      return
    }

    setCotacoes(data.cotacoes)
  }

  useEffect(() => {
    getData()
  }, [])

  const formatTitle = (title: string) => {
    return title
      .split(' ')
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ')
  }

  return (
    <Suspense>
      <Card
        borderWidth={1}
        borderColor={'$borderColor'}
        borderTopWidth={5}
        borderTopColor={'#0171BB'}
        backgroundColor={'#FFF'}
      >
        <Card.Header space>
          <XStack
            justifyContent='space-between'
            alignItems='center'
          >
            <Text fontSize={'$6'} fontWeight='bold'>
              Cotações
            </Text>

            <Text fontSize={'$3'} color={'$gray10'}>
              {new Date().toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              })}
            </Text>
          </XStack>

          <YStack
            borderWidth={hasError ? 0 : 1}
            borderColor={'$borderColor'}
            borderRadius={'$4'}
            separator={<Separator />}
          >
            {!hasError &&
              cotacoes.map(cotacao => (
                <XStack
                  padding={'$3'}
                  alignItems='center'
                  justifyContent='space-between'
                  key={cotacao.codMoe}
                >
                  <XStack alignItems='center' gap={'$4'}>
                    {iconCard(cotacao)}

                    <Text>
                      {formatTitle(cotacao.desMoe)}
                    </Text>
                  </XStack>

                  <Text fontSize={'$5'} fontWeight={'bold'}>
                    {cotacao.vlrCot.toLocaleString(
                      'pt-BR',
                      {
                        style: 'currency',
                        currency: 'BRL',
                      }
                    )}
                  </Text>
                </XStack>
              ))}

            {hasError && (
              <>
                <Separator />

                <Text marginTop={'$4'}>
                  Sem cotações no momento!
                </Text>
              </>
            )}
          </YStack>
        </Card.Header>
      </Card>
    </Suspense>
  )
}
