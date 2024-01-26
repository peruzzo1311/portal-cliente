import Titulo from '@/types/Titulo'
import { useToastController } from '@tamagui/toast'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { Separator, Spinner, Text, View } from 'tamagui'
import BoletosFlatlistComponent from './flatlist-component'

type Props = {
  boletos: Titulo[]
  isLoading: boolean
  toast: ReturnType<typeof useToastController>
  onRefresh: () => void
}

export default function BoletosFlatlist({
  boletos,
  isLoading,
  toast,
  onRefresh,
}: Props) {
  const renderItem = ({ item }: { item: Titulo }) => (
    <BoletosFlatlistComponent item={item} toastController={toast} />
  )

  return (
    <FlatList
      data={boletos}
      keyExtractor={(item) => item.numTit}
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
