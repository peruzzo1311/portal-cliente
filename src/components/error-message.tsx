import { Toast, useToastState } from '@tamagui/toast'
import React from 'react'

export default function MessageToast() {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively)
    return null

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation='200ms'
      viewportName={currentToast.viewportName}
      backgroundColor={'$red10'}
    >
      <Toast.Title
        color={'#fff'}
        fontWeight={'bold'}
        fontSize={'$5'}
        textAlign='center'
      >
        {currentToast.title}
      </Toast.Title>
    </Toast>
  )
}
