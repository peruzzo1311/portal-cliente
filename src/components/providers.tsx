import { store } from '@/store'
import { ToastProvider } from '@tamagui/toast'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { TamaguiProvider } from 'tamagui'
import config from '../../tamagui.config'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TamaguiProvider config={config} defaultTheme='light'>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ToastProvider burntOptions={{ from: 'top' }}>
            {children}
          </ToastProvider>
        </SafeAreaProvider>
      </TamaguiProvider>
    </Provider>
  )
}
