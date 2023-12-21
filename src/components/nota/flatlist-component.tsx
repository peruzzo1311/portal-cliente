import { baixarNota, baixarNotaXml } from '@/api/nota-fiscal'
import { useAppSelector } from '@/store/hooks'
import NotaFiscal from '@/types/nota-fiscal'
import DownloadXml from '@/utils/download-xml'
import viewPdf from '@/utils/view-pdf'
import { Download, File, FileX, X } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as Sharing from 'expo-sharing'
import { memo, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Button,
  Dialog,
  Separator,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui'

type Props = {
  item: NotaFiscal
  toastController: ReturnType<typeof useToastController>
}

const NotasFlatlistComponent = ({ item, toastController }: Props) => {
  const user = useAppSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const downloadPdf = async () => {
    try {
      setIsLoading(true)

      const res = await baixarNota(item)

      if (res.codRet === 0) {
        viewPdf(res.pdfNfe, item.numNfv)
      } else {
        toastController.show(res.msgRet)
      }
    } catch (error: any) {
      toastController.show(error.message)
    } finally {
      setIsLoading(false)
      setOpenModal(false)
    }
  }

  const downloadXml = async () => {
    try {
      setIsLoading(true)

      const res = await baixarNotaXml(item)

      if (res.codRet === 0) {
        res.xmlNfe.forEach(async (xml) => {
          const path = DownloadXml(xml.string, item.numNfv)

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync('file://' + path)
          }
        })
      } else {
        toastController.show(res.msgRet)
      }
    } catch (error: any) {
      toastController.show(error.message)
    } finally {
      setIsLoading(false)
      setOpenModal(false)
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

      <Dialog
        modal
        open={openModal}
        onOpenChange={(open) => setOpenModal(open)}
      >
        <Dialog.Trigger asChild>
          <Button backgroundColor={'$primary7'} disabled={isLoading}>
            {isLoading ? (
              <Spinner color='$text-white' />
            ) : (
              <Download color='$text-white' />
            )}
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay
            key='overlay'
            animation='quick'
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            bordered
            elevate
            key='content'
            animateOnly={['transform', 'opacity']}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap='$4'
            minWidth={300}
          >
            <XStack
              justifyContent='space-between'
              alignItems='center'
              marginBottom={'$4'}
            >
              <Text fontSize={'$5'} fontWeight={'700'}>
                Opções de download
              </Text>

              <Dialog.Close>
                <View
                  backgroundColor={'$primary7'}
                  borderRadius={'$12'}
                  padding={'$1'}
                >
                  <X color='$text-white' size={24} />
                </View>
              </Dialog.Close>
            </XStack>

            {!isLoading && (
              <YStack gap={'$4'}>
                <TouchableOpacity onPress={downloadPdf}>
                  <XStack
                    justifyContent='space-between'
                    alignItems='center'
                    padding={'$2'}
                  >
                    <Text fontSize={'$5'}>Baixar PDF</Text>

                    <File size={24} />
                  </XStack>
                </TouchableOpacity>

                <Separator />

                <TouchableOpacity onPress={downloadXml}>
                  <XStack
                    justifyContent='space-between'
                    alignItems='center'
                    padding={'$2'}
                  >
                    <Text fontSize={'$5'}>Baixar XML</Text>

                    <FileX size={24} />
                  </XStack>
                </TouchableOpacity>
              </YStack>
            )}

            {isLoading && (
              <XStack justifyContent='center' alignItems='center' height={125}>
                <Spinner size='large' color='$primary7' />
              </XStack>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </XStack>
  )
}

export default memo(NotasFlatlistComponent)
