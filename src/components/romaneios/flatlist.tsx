import Romaneio from '@/types/romaneio'
import { useToastController } from '@tamagui/toast'
import {
  FlatList,
  RefreshControl,
} from 'react-native-gesture-handler'
import { Separator, Text } from 'tamagui'
import RomaneiosFlatlistComponent from './flatlist-component'

type Props = {
  romaneios: Romaneio[]
  isLoading: boolean
  toast: ReturnType<typeof useToastController>
  onRefresh: () => void
}

export default function RomaneiosFlatlist({
  romaneios,
  isLoading,
  onRefresh,
}: Props) {
  const renderItem = ({ item }: { item: Romaneio }) => (
    <RomaneiosFlatlistComponent item={item} />
  )

  return (
    <FlatList
      data={romaneios}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={
        (<Separator marginVertical={'$4'} />) as any
      }
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
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
            Nenhum romaneio encontrado
          </Text>
        ) as any)
      }
    />
  )
}
