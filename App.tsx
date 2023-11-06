import Providers from '@/components/providers'
import StackRoute from '@/routes'
import { NavigationContainer } from '@react-navigation/native'
import { ToastViewport } from '@tamagui/toast'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterSemiBold: require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }
  return (
    <Providers>
      <NavigationContainer>
        <ToastViewport
          multipleToasts
          flexDirection='column-reverse'
          top={40}
          left={4}
          right={4}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            animated={true}
            translucent={true}
            showHideTransition='slide'
            backgroundColor={'#0171BB'}
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />

          <StackRoute />
        </SafeAreaView>
      </NavigationContainer>
    </Providers>
  )
}
