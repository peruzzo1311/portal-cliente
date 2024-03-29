import BoletosScreen from '@/screens/boletos'
import ContratosScreen from '@/screens/contratos'
import HomeScreen from '@/screens/home'
import NotasFiscaisScreen from '@/screens/notas-fiscais'
import RomaneiosScreen from '@/screens/romaneios'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  FileEdit,
  Home,
  ScrollText,
  Ticket,
  Truck,
} from '@tamagui/lucide-icons'

const Drawer = createDrawerNavigator()

export default function DrawerRoute() {
  return (
    <Drawer.Navigator
      initialRouteName='Início'
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerActiveBackgroundColor: '#0171BB',
        drawerActiveTintColor: '#F5F5F5',
        drawerLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 16,
          fontWeight: 'bold',
          alignItems: 'center',
        },
        drawerItemStyle: {
          marginVertical: 4,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 4,
          justifyContent: 'center',
        },
        drawerStyle: {
          width: 300,
        },
      }}
    >
      <Drawer.Screen
        name='Início'
        component={HomeScreen}
        options={{
          drawerLabel: 'Início',
          drawerIcon(props) {
            return <Home size={28} color={props.color} />
          },
        }}
      />

      <Drawer.Screen
        name='Boletos'
        component={BoletosScreen}
        options={{
          drawerLabel: 'Boletos',
          drawerIcon(props) {
            return <Ticket size={28} color={props.color} />
          },
        }}
      />

      <Drawer.Screen
        name='NotasFiscais'
        component={NotasFiscaisScreen}
        options={{
          drawerLabel: 'Notas Fiscais',
          drawerIcon(props) {
            return (
              <ScrollText size={28} color={props.color} />
            )
          },
        }}
      />

      <Drawer.Screen
        name='RomaneiosScreen'
        component={RomaneiosScreen}
        options={{
          drawerLabel: 'Romaneios',
          drawerIcon(props) {
            return <Truck size={28} color={props.color} />
          },
        }}
      />

      <Drawer.Screen
        name='ContratosScreen'
        component={ContratosScreen}
        options={{
          drawerLabel: 'Contratos',
          drawerIcon(props) {
            return (
              <FileEdit size={28} color={props.color} />
            )
          },
        }}
      />
    </Drawer.Navigator>
  )
}
