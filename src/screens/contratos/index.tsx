import { exportaContratos } from '@/api/contratos'
import AppBar from '@/components/appbar'
import ContractsFilterModal from '@/components/contracts/filter-modal'
import { ContractListItem } from '@/components/contracts/list-item'
import { useAppSelector } from '@/store/hooks'
import ContratoCompra from '@/types/contratos'
import { Filter, FilterX } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import {
  Button,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui'

export default function ContratosScreen({
  navigation,
}: any) {
  const [openFilter, setOpenFilter] = useState(false)
  const [contratosFilteredes, setContratosFiltered] =
    useState<ContratoCompra[]>([])
  const [contratos, setContratos] = useState<
    ContratoCompra[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  const userProperties = useAppSelector(
    state => state.userProperties
  )
  const toast = useToastController()

  const getContracts = async () => {
    try {
      if (!userProperties.codfor) {
        return
      }

      const res = await exportaContratos(
        userProperties.codfor
      )

      if (res.codRet === 0) {
        setContratos(res.contratos)
      } else {
        console.log(res.msgRet)

        toast.show(res.msgRet)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearFilter = () => {
    setContratosFiltered(contratos)
  }

  const renderItem = ({
    item,
  }: {
    item: ContratoCompra
  }) => <ContractListItem item={item} />

  useEffect(() => {
    getContracts()
  }, [userProperties])

  return (
    <View backgroundColor={'#fff'} flex={1}>
      <AppBar navigation={navigation} />

      <YStack
        flex={1}
        padding={'$4'}
        backgroundColor={'#FFF'}
        gap={'$4'}
      >
        <XStack justifyContent='flex-end' gap={'$4'}>
          <Button
            icon={FilterX}
            backgroundColor={'$primary1'}
            borderWidth={'$1'}
            borderColor={'$primary7'}
            color={'$primary7'}
            scaleIcon={1.5}
            onPress={handleClearFilter}
          >
            Limpar filtro
          </Button>

          <Button
            icon={Filter}
            backgroundColor={'$primary7'}
            color={'$text-white'}
            scaleIcon={1.5}
            onPress={() => setOpenFilter(true)}
          />
        </XStack>

        <Separator borderColor={'$primary7'} />

        <YStack>
          <FlatList
            data={contratos}
            keyExtractor={item => item.numCtr.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={
              (<Separator marginVertical={'$4'} />) as any
            }
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getContracts}
              />
            }
            ListEmptyComponent={
              !isLoading &&
              ((
                <Text
                  color={'$primary7'}
                  textAlign={'center'}
                  fontSize={'$3'}
                  fontWeight={'bold'}
                >
                  Nenhum boleto encontrado
                </Text>
              ) as any)
            }
          />
        </YStack>
      </YStack>

      <ContractsFilterModal
        open={openFilter}
        setOpen={setOpenFilter}
        contratos={contratos}
        setContratosFiltered={setContratosFiltered}
      />
    </View>
  )
}
