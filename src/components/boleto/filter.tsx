import { Filter, FilterX } from '@tamagui/lucide-icons'
import { Button, XStack } from 'tamagui'

type Props = {
  clearFilter: () => void
  setOpenFilter: (value: boolean) => void
}

export default function BoletosFilter({ clearFilter, setOpenFilter }: Props) {
  return (
    <XStack justifyContent='flex-end' gap={'$4'}>
      <Button
        icon={FilterX}
        backgroundColor={'$primary1'}
        borderWidth={'$1'}
        borderColor={'$primary7'}
        color={'$primary7'}
        pressStyle={{
          backgroundColor: '$primary7',
          //@ts-ignore
          color: '$text-white',
        }}
        scaleIcon={1.5}
        onPress={clearFilter}
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
  )
}
