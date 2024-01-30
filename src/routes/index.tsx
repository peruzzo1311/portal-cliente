import DrawerRoute from '@/routes/drawer'
import LoginScreen from '@/screens/login'
import ProfileScreen from '@/screens/profile'
import DocumentValidate from '@/screens/register/document-validate'
import RegisterModal from '@/screens/register/register-modal'
import RomaneiosDetail from '@/screens/romaneios/detail'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function StackRoute() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name='DrawerRoute'
          component={DrawerRoute}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen
          name='DocumentValidate'
          component={DocumentValidate}
        />

        <Stack.Screen
          name='Register'
          component={RegisterModal}
        />

        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
        />

        <Stack.Screen
          name='RomaneioDetail'
          component={RomaneiosDetail}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
