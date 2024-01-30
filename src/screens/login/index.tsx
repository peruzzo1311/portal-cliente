import { login } from '@/api/login'
import { ThemedButton } from '@/components/button'
import MessageToast from '@/components/error-message'
import { InputText } from '@/components/text-input'
import { AppDispatch } from '@/store'
import { useAppDispatch } from '@/store/hooks'
import { User } from '@/types/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Check } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'
import {
  Checkbox,
  Form,
  Image,
  Label,
  Spinner,
  Text,
  View,
} from 'tamagui'
import handleError from 'utils/handle-error'

export default function LoginScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keepLogin, setKeepLogin] = useState(false)
  const toast = useToastController()
  const appDispatch: AppDispatch = useAppDispatch()

  const handleDispatch = (
    user: User,
    keepLogin: boolean
  ) => {
    appDispatch({
      type: 'user/setUser',
      payload: {
        ...user,
        keepLogin,
      },
    })
  }

  const handleStore = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
      toast.show('Erro ao salvar usuário:')
    }
  }

  const handleLogin = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    const { user, token } = await login({
      username,
      password,
    })

    return user ? { ...user, username, token } : null
  }

  const handleNavigation = () => {
    navigation.replace('DrawerRoute')
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      if (!username || !password) {
        toast.show('Preencha todos os campos')

        return
      }

      const user = await handleLogin({ username, password })

      if (user) {
        try {
          handleDispatch(user, keepLogin)
          handleStore({
            ...user,
            password,
            keepLogin,
          })
          handleNavigation()
        } catch (error: any) {
          toast.show(handleError(error))
        }
      }
    } catch (error: any) {
      toast.show(handleError(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeepLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')

      if (jsonValue) {
        const userData: User = JSON.parse(jsonValue)

        if (userData.keepLogin && userData.password) {
          setIsLoading(true)

          const { username, password } = userData
          const user = await handleLogin({
            username,
            password,
          })

          appDispatch({
            type: 'user/setUser',
            payload: {
              ...user,
              keepLogin: true,
            },
          })

          handleNavigation()
        }
      }
    } catch (error: any) {
      toast.show(handleError(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    toast.hide()

    handleKeepLogin()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }
        style={{ flex: 1, backgroundColor: '#FFF' }}
      >
        <MessageToast />

        <View
          flex={1}
          justifyContent='center'
          alignItems='center'
        >
          <Image
            source={require('@/assets/images/icon.png')}
            style={{
              width: 150,
              height: 150,
            }}
          />

          <Form
            onSubmit={handleSubmit}
            width={'100%'}
            padding={24}
            gap={12}
            justifyContent='center'
          >
            <View>
              <Label fontSize={16}>Usuário</Label>

              <InputText
                value={username}
                placeholder='Digite seu usuário'
                disabled={isLoading}
                borderColor={'$primary7'}
                autoComplete='email'
                selectTextOnFocus
                onChangeText={setUsername}
              />
            </View>

            <View>
              <Label fontSize={16}>Senha</Label>

              <InputText
                value={password}
                disabled={isLoading}
                autoComplete='current-password'
                selectTextOnFocus
                placeholder='Digite sua senha'
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <View
              flexDirection='row'
              alignItems='center'
              gap={8}
            >
              <Checkbox
                size='$5'
                id='keepLogin'
                borderWidth={2}
                onCheckedChange={() =>
                  setKeepLogin(prev => !prev)
                }
                checked={keepLogin}
                backgroundColor={
                  keepLogin ? '$primary7' : '#fff'
                }
                borderColor={
                  keepLogin ? '$primary7' : '#ddd'
                }
                disabled={isLoading}
                pressStyle={{ scale: 0.9 }}
                animation={'bouncy'}
                marginVertical={24}
              >
                <Checkbox.Indicator>
                  <Check color={'#fff'} />
                </Checkbox.Indicator>
              </Checkbox>

              <Label htmlFor='keepLogin' fontSize={16}>
                Lembrar de mim
              </Label>
            </View>

            <Form.Trigger asChild disabled={!isLoading}>
              <ThemedButton
                icon={isLoading ? <Spinner /> : undefined}
                scaleIcon={1.5}
                disabled={isLoading}
                opacity={isLoading ? 0.5 : 1}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </ThemedButton>
            </Form.Trigger>
          </Form>

          <View
            paddingHorizontal={24}
            width={'100%'}
            flexDirection='row'
            alignItems='center'
            justifyContent={'center'}
          >
            <Text
              fontSize={'$6'}
              color={'$primary6'}
              onPress={() =>
                navigation.navigate('DocumentValidate')
              }
              textDecorationLine='underline'
            >
              Não possui uma conta?
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
