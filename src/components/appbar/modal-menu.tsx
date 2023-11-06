import { DrawerNavigationProp } from '@react-navigation/drawer'
import { Menu } from '@tamagui/lucide-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

type ModalMenuProps = {
  navigation: DrawerNavigationProp<Record<string, object>>
}

export default function ModalMenu({ navigation }: ModalMenuProps) {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Menu size={'$3'} color={'$text-white'} />
    </TouchableOpacity>
  )
}
