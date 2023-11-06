import { Toast, useToastState } from '@tamagui/toast'
import React from 'react'
import { YStack } from 'tamagui'

export default function MessageToast() {
  const currentToast = useToastState()

  if (!currentToast) return null

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation='quick'
      viewportName={currentToast.viewportName}
      backgroundColor={'$red10'}
    >
      <YStack>
        <Toast.Title
          color={'#fff'}
          fontWeight={'bold'}
          fontSize={'$5'}
          textAlign='center'
        >
          {currentToast.title}
        </Toast.Title>

        {!!currentToast.message && (
          <Toast.Description color={'#fff'}>
            {currentToast.message}
          </Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}
