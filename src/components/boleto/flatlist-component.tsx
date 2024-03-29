import { baixarTitulo } from '@/api/boletos'
import { useAppSelector } from '@/store/hooks'
import Titulo from '@/types/Titulo'
import { Download } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import React, { memo, useState } from 'react'
import {
  Button,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui'
import viewPdf from 'utils/view-pdf'

type Props = {
  item: Titulo
  toastController: ReturnType<typeof useToastController>
}

const BoletosFlatlistComponent = ({
  item,
  toastController,
}: Props) => {
  const user = useAppSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      const res = await baixarTitulo(user, item)

      if (res.codRet === 0) {
        viewPdf(res.pdfBol, item.numNfv)
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
          <Text color={'$text-secondary'}>
            N° do título:
          </Text>

          <Text fontWeight={'700'} color={'$text-primary'}>
            {item.numTit}
          </Text>
        </XStack>

        <XStack gap={'$2'}>
          <Text color={'$text-secondary'}>Vencimento:</Text>

          <Text fontWeight={'700'} color={'$text-primary'}>
            {item.vctPro}
          </Text>
        </XStack>

        <XStack gap={'$2'}>
          <Text color={'$text-secondary'}>Valor:</Text>

          <Text fontWeight={'700'} color={'$text-primary'}>
            {item.vlrAbe.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
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

export default memo(BoletosFlatlistComponent)
