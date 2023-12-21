import { DrawerNavigationProp } from '@react-navigation/drawer'
import { Menu } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

type ModalMenuProps = {
  navigation: DrawerNavigationProp<Record<string, object>>
}

export default function ModalMenu({ navigation }: ModalMenuProps) {
  return (
    <Button
      backgroundColor={'$primary7'}
      color={'$text-white'}
      width={50}
      icon={Menu}
      scaleIcon={2}
      onPress={() => navigation.openDrawer()}
    />
  )
}
