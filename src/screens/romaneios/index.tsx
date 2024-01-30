import { GetRomaneios } from '@/api/romaneios'
import AppBar from '@/components/appbar'
import RomaneiosFilter from '@/components/romaneios/filter'
import RomaneiosFilterModal from '@/components/romaneios/filter-modal'
import RomaneiosFlatlist from '@/components/romaneios/flatlist'
import { useAppSelector } from '@/store/hooks'
import Romaneio from '@/types/romaneio'
import { useToastController } from '@tamagui/toast'
import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  Separator,
  View,
  YStack,
} from 'tamagui'

export default function RomaneiosScreen({
  navigation,
}: any) {
  const [romaneiosFiltered, setRomaneiosFiltered] =
    useState<Romaneio[]>([])
  const [romaneios, setRomaneios] = useState<Romaneio[]>([])
  const [openFilter, setOpenFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const user = useAppSelector(state => state.user)
  const toast = useToastController()

  const getRomaneios = async () => {
    setIsLoading(true)
    const romaneios = await GetRomaneios(user)

    if (romaneios.codRet !== 0) {
      toast.show(romaneios.msgRet)
    }

    setRomaneios(romaneios.romaneios ?? [])
    setIsLoading(false)
  }

  const handleClearFilter = () => {
    setRomaneiosFiltered(romaneios)
  }

  useEffect(() => {
    toast.hide()

    getRomaneios()
  }, [])

  return (
    <View flex={1} backgroundColor={'#FFF'}>
      <AppBar navigation={navigation} />

      <YStack
        flex={1}
        padding={'$4'}
        backgroundColor={'#FFF'}
        gap={'$4'}
      >
        <RomaneiosFilter
          clearFilter={handleClearFilter}
          setOpenFilter={setOpenFilter}
        />

        <Separator borderColor={'$primary7'} />

        <AnimatePresence>
          <YStack flex={1}>
            <RomaneiosFlatlist
              romaneios={romaneiosFiltered}
              isLoading={isLoading}
              toast={toast}
              onRefresh={getRomaneios}
            />
          </YStack>
        </AnimatePresence>
      </YStack>

      <RomaneiosFilterModal
        open={openFilter}
        setOpen={setOpenFilter}
        romaneios={romaneios}
        setRomaneiosFiltered={setRomaneiosFiltered}
      />
    </View>
  )
}
