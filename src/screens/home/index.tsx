import {
  ExportaFaturaMesAnterior,
  ExportaFaturaMesAtual,
} from '@/api/cards'
import {
  exportaPagamentos6,
  exportaPagamentosPeriodo,
} from '@/api/graphs'
import { GetRomaneios } from '@/api/romaneios'
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import { User } from '@/types/User'
import Romaneio from '@/types/romaneio'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { ScrollView, Spinner, View, YStack } from 'tamagui'

import AppBar from '@/components/appbar'
import Cards from '@/components/cards'
import CardsCotacoes from '@/components/cotacoes'
import MessageToast from '@/components/error-message'
import Pagamentos from '@/components/pagamentos'
import GraphRomaneios from '@/components/romaneios/graph'

type Card = {
  label: string
  value: number
}

type Pagamento = {
  vctPro: string
  vlrAbe: number
}

type PagamentoPeriodo = {
  vlrAbe: number
  descricao: string
}

export default function HomeScreen({ navigation }: any) {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(
    []
  )
  const [pagamentosPeriodo, setPagamentosPeriodo] =
    useState<PagamentoPeriodo[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [romaneios, setRomaneios] = useState<Romaneio[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const getFatura = async (user: User, mes: string) => {
    const fatura =
      mes === 'atual'
        ? ExportaFaturaMesAtual(user)
        : ExportaFaturaMesAnterior(user)
    const { codRet, msgRet, vlrFat } = await fatura

    return { codRet, msgRet, value: vlrFat ?? 0 }
  }

  const getPagamentos = async (user: User) => {
    const [pagamentos, pagamentosPeriodo] =
      await Promise.all([
        exportaPagamentos6(user),
        exportaPagamentosPeriodo(user),
      ])

    return {
      pagamentos: pagamentos.titulo ?? [],
      pagamentosPeriodo: pagamentosPeriodo.periodo ?? [],
    }
  }

  const getRomaneios = async (user: User) => {
    const romaneios = await GetRomaneios(user)

    return romaneios.romaneios ?? []
  }

  const getData = async () => {
    try {
      setIsLoading(true)

      const [
        faturaMesAtual,
        faturaMesAnterior,
        pagamentos,
        romaneios,
      ] = await Promise.all([
        getFatura(user, 'atual'),
        getFatura(user, 'anterior'),
        getPagamentos(user),
        getRomaneios(user),
      ])

      const cards = [
        {
          label: 'Faturamento do mês atual',
          value: faturaMesAtual.value,
        },
        {
          label: 'Faturamento do mês anterior',
          value: faturaMesAnterior.value,
        },
      ]

      setPagamentos(pagamentos.pagamentos)
      setPagamentosPeriodo(pagamentos.pagamentosPeriodo)
      setCards(cards)
      setRomaneios(romaneios)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View flex={1}>
      <AppBar navigation={navigation} />

      <MessageToast />

      {isLoading && (
        <View
          flex={1}
          justifyContent='center'
          alignItems='center'
          backgroundColor={'#fff'}
        >
          <Spinner size='large' color='$primary7' />
        </View>
      )}

      {!isLoading && (
        <ScrollView
          flex={1}
          backgroundColor={'#fff'}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={getData}
            />
          }
        >
          <YStack padding={'$4'} flex={1} space={'$4'}>
            <Cards cards={cards} />

            <Pagamentos
              pagamentos={pagamentos}
              pagamentosPeriodo={pagamentosPeriodo}
            />

            <GraphRomaneios romaneios={romaneios} />

            <CardsCotacoes />
          </YStack>
        </ScrollView>
      )}
    </View>
  )
}
