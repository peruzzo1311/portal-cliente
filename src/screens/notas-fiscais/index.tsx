import { exportaNotas } from '@/api/nota-fiscal'
import AppBar from '@/components/appbar'
import NotasFilter from '@/components/nota/filter'

import NotasFilterModal from '@/components/nota/filter-modal'
import NotasFlatlist from '@/components/nota/flatlist'
import { useAppSelector } from '@/store/hooks'
import NotaFiscal from '@/types/nota-fiscal'
import { useToastController } from '@tamagui/toast'
import { useEffect, useState } from 'react'
import { AnimatePresence, Separator, View, YStack } from 'tamagui'

export default function NotasFiscaisScreen({ navigation }: any) {
  const [notasFiltered, setNotasFiltered] = useState<NotaFiscal[]>([])
  const [notas, setNotas] = useState<NotaFiscal[]>([])
  const [openFilter, setOpenFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const user = useAppSelector((state) => state.user)
  const toast = useToastController()

  const getData = async () => {
    try {
      const res = await exportaNotas(user)

      if (res.codRet === 0) {
        setNotas(res.notas)

        setNotasFiltered(res.notas)
      } else {
        toast.show(res.msgRet)
      }
    } catch (error: any) {
      const status = error.response?.status

      const errorMsg =
        status === 500
          ? 'Servidor indisponível, tente novamente mais tarde.'
          : 'Erro desconhecido'

      toast.show(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearFilter = () => {
    setNotasFiltered(notas)
  }

  useEffect(() => {
    toast.hide()

    getData()
  }, [])

  return (
    <View backgroundColor={'$appBackground'} flex={1}>
      <AppBar navigation={navigation} />

      <YStack flex={1} padding={'$4'} backgroundColor={'#FFF'} gap={'$4'}>
        <NotasFilter
          clearFilter={handleClearFilter}
          setOpenFilter={setOpenFilter}
        />

        <Separator borderColor={'$primary7'} />

        <AnimatePresence>
          <YStack
            animation={'bouncy'}
            enterStyle={{
              scale: 1.5,
              y: -10,
              opacity: 0,
            }}
          >
            <NotasFlatlist
              notas={notasFiltered}
              isLoading={isLoading}
              toast={toast}
            />
          </YStack>
        </AnimatePresence>
      </YStack>

      <NotasFilterModal
        open={openFilter}
        setOpen={setOpenFilter}
        notas={notas}
        setNotasFiltered={setNotasFiltered}
      />
    </View>
  )
}
