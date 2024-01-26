import NotaFiscal from '@/types/nota-fiscal'
import { useToastController } from '@tamagui/toast'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { Separator, Spinner, Text, View } from 'tamagui'
import NotasFlatlistComponent from './flatlist-component'

type Props = {
  notas: NotaFiscal[]
  isLoading: boolean
  toast: ReturnType<typeof useToastController>
  onRefresh: () => void
}

export default function NotasFlatlist({
  notas,
  isLoading,
  toast,
  onRefresh,
}: Props) {
  const renderItem = ({ item }: { item: NotaFiscal }) => (
    <NotasFlatlistComponent item={item} toastController={toast} />
  )

  return (
    <FlatList
      data={notas}
      keyExtractor={(item) => item.numNfv.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={(<Separator marginVertical={'$4'} />) as any}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        isLoading ? (
          <View flex={1} justifyContent='center' alignItems='center'>
            <Spinner size='large' color='$primary7' />
          </View>
        ) : (
          <Text
            color={'$primary7'}
            textAlign={'center'}
            fontSize={'$3'}
            fontWeight={'bold'}
          >
            Nenhum boleto encontrado
          </Text>
        )
      }
    />
  )
}
