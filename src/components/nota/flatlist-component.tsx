import { baixarNota } from '@/api/nota-fiscal'
import { useAppSelector } from '@/store/hooks'
import NotaFiscal from '@/types/nota-fiscal'
import viewPdf from '@/utils/view-pdf'
import { Download } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { memo, useState } from 'react'
import { Button, Spinner, Text, XStack, YStack } from 'tamagui'

type Props = {
  item: NotaFiscal
  toastController: ReturnType<typeof useToastController>
}

const NotasFlatlistComponent = ({ item, toastController }: Props) => {
  const user = useAppSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      const res = await baixarNota(user, item)

      if (res.codRet === 0) {
        const filename = `Nota_${item.numNfv}.pdf`

        viewPdf(res.pdfNfe, filename)
      } else {
        toastController.show(res.msgRet)
      }
    } catch (error: any) {
      toastController.show(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <XStack
      justifyContent='space-between'
      alignItems='center'
      backgroundColor={'#FFF'}
    >
      <YStack gap={'$2'}>
        <XStack gap={'$2'}>
          <Text fontWeight={'700'} color={'$text-secondary'}>
            N° da nota:
          </Text>

          <Text fontWeight={'700'} color={'$text-primary'}>
            {item.numNfv}
          </Text>
        </XStack>

        <XStack gap={'$2'}>
          <Text fontWeight={'700'} color={'$text-secondary'}>
            Data:
          </Text>
          <Text fontWeight={'700'} color={'$text-primary'}>
            {item.datAut}
          </Text>
        </XStack>
      </YStack>

      <Button
        backgroundColor={'$primary7'}
        onPress={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner color='$text-white' />
        ) : (
          <Download color='$text-white' />
        )}
      </Button>
    </XStack>
  )
}

export default memo(NotasFlatlistComponent)
