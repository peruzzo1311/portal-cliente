import {
  ExportaFaturaMesAnterior,
  ExportaFaturaMesAtual,
} from '@/api/cards'
import {
  exportaPagamentos6,
  exportaPagamentosPeriodo,
} from '@/api/graphs'
import { GetRomaneios } from '@/api/romaneios'
import AppBar from '@/components/appbar'
import Cards from '@/components/cards'
import MessageToast from '@/components/error-message'
import Pagamentos from '@/components/pagamentos'
import GraphRomaneios from '@/components/romaneios/graph'
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import { User } from '@/types/User'
import Romaneio from '@/types/romaneio'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useToastController } from '@tamagui/toast'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import {
  Button,
  ScrollView,
  Spinner,
  Text,
  View,
  YStack,
} from 'tamagui'

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
  const [activeNotFound, setActiveNotFound] =
    useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [romaneios, setRomaneios] = useState<Romaneio[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const user = useAppSelector(state => state.user)
  const toast = useToastController()
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

      if (
        faturaMesAtual.codRet === 1 &&
        faturaMesAnterior.codRet === 1
      ) {
        toast.show('Nenhum dado encontrado.')
      } else if (
        faturaMesAtual.codRet === 1 ||
        faturaMesAnterior.codRet === 1
      ) {
        toast.show(
          faturaMesAtual.msgRet || faturaMesAnterior.msgRet
        )
      }
    } catch (error: any) {
      const status = error.response?.status
      const errorMsg =
        status === 500
          ? 'Servidor indisponível, tente novamente mais tarde.'
          : 'Ocorreu um erro ao buscar os dados.'

      toast.show(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user')

    dispatch({
      type: 'user/clearUser',
    })

    navigation.replace('Login', {})
  }

  useEffect(() => {
    toast.hide()

    if (user.properties.length < 0 || !user.properties) {
      toast.show(
        'Há algo de errado com o seu usuário, entre em contato com a empresa.'
      )

      setActiveNotFound(true)
    } else {
      getData()
    }
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

      {!isLoading && !activeNotFound && (
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
          </YStack>
        </ScrollView>
      )}

      {!isLoading && activeNotFound && (
        <View
          padding={4}
          flex={1}
          justifyContent='center'
          alignItems='center'
          gap={24}
        >
          <Text fontWeight={'700'} fontSize={28}>
            Usuário não encontrado
          </Text>

          <Text
            textAlign='center'
            fontWeight={'700'}
            fontSize={16}
            color={'$text-secondary'}
          >
            Entre em contato com a sua empresa para
            verificar se o seu usuário está correto.
          </Text>

          <Button
            backgroundColor={'$primary7'}
            color={'$text-white'}
            fontWeight={'bold'}
            size={'$5'}
            marginTop={24}
            onPress={handleLogout}
          >
            Voltar a tela de login
          </Button>
        </View>
      )}
    </View>
  )
}
