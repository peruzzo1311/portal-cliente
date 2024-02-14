import { exportaTitulos } from '@/api/boletos'
import { useAppSelector } from '@/store/hooks'
import Titulo from '@/types/Titulo'
import { useToastController } from '@tamagui/toast'
import { useEffect, useState } from 'react'
import { Separator, View, YStack } from 'tamagui'

import AppBar from '@/components/appbar'
import BoletosFilter from '@/components/boleto/filter'
import BoletosFilterModal from '@/components/boleto/filter-modal'
import BoletosFlatlist from '@/components/boleto/flatlist'

export default function BoletosScreen({ navigation }: any) {
  const [openFilter, setOpenFilter] = useState(false)
  const [boletosFiltered, setBoletosFiltered] = useState<
    Titulo[]
  >([])
  const [boletos, setBoletos] = useState<Titulo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const user = useAppSelector(state => state.user)
  const toast = useToastController()

  const getBoletos = async () => {
    try {
      const res = await exportaTitulos(user)

      if (res.codRet === 0) {
        setBoletos(res.titulos)

        setBoletosFiltered(res.titulos)
      } else {
        toast.show(res.msgRet)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearFilter = () => {
    setBoletosFiltered(boletos)
  }

  useEffect(() => {
    getBoletos()
  }, [])

  return (
    <View backgroundColor={'#fff'} flex={1}>
      <AppBar navigation={navigation} />

      <YStack
        flex={1}
        padding={'$4'}
        backgroundColor={'#FFF'}
        gap={'$4'}
      >
        <BoletosFilter
          clearFilter={handleClearFilter}
          setOpenFilter={setOpenFilter}
        />

        <Separator borderColor={'$primary7'} />

        <YStack>
          <BoletosFlatlist
            boletos={boletosFiltered}
            isLoading={isLoading}
            toast={toast}
            onRefresh={getBoletos}
          />
        </YStack>
      </YStack>

      <BoletosFilterModal
        open={openFilter}
        setOpen={setOpenFilter}
        boletos={boletos}
        setBoletosFiltered={setBoletosFiltered}
      />
    </View>
  )
}
