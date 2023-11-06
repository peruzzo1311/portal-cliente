import { login } from '@/api/login'
import { ThemedButton } from '@/components/button'
import { InputText } from '@/components/text-input'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { useRef, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Button, View } from 'tamagui'

type FormData = {
  name: string
  familyName: string
  password: string
  confirmPassword: string
}

export default function RegisterModal({ route, navigation }: any) {
  const { codCli, email } = route.params
  const [formData, setFormData] = useState({} as FormData)
  const [isLoading, setIsLoading] = useState(false)
  const sobrenomeInputRef = useRef<TextInput>(null)
  const senhaInputRef = useRef<TextInput>(null)
  const confirmarSenhaInputRef = useRef<TextInput>(null)
  const toast = useToastController()

  const handleError = (error: any) => {
    const status = error.response?.status
    const messages: any = {
      401: 'Usuário ou senha incorretos.',
      500: 'Servidor indisponível, tente novamente mais tarde.',
    }
    const message = messages[status] || 'Ocorreu um erro inesperado.'
    toast.show(message)
    console.error('Erro:', error)
  }

  const handleSubmit = async () => {
    try {
      const { user, token } = await login({
        username: 'weliton.ribeiro@kgepel.com.br',
        password: 'S@p1ens',
      })
    } catch (error: any) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View flex={1} padding={8} backgroundColor={'#FFF'}>
      <Button
        width={40}
        height={40}
        backgroundColor={'#FFF'}
        onPress={() => navigation.navigate('Login')}
      >
        <ChevronLeft color={'$primary7'} size={40} />
      </Button>

      <View marginVertical={24} gap={16}>
        <InputText
          placeholder='Nome'
          autoFocus
          selectTextOnFocus
          blurOnSubmit={false}
          onSubmitEditing={() => sobrenomeInputRef.current?.focus()}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <InputText
          placeholder='Sobrenome'
          ref={sobrenomeInputRef}
          selectTextOnFocus
          blurOnSubmit={false}
          onSubmitEditing={() => senhaInputRef.current?.focus()}
          onChangeText={(text) =>
            setFormData({ ...formData, familyName: text })
          }
        />

        <InputText
          placeholder='Senha'
          ref={senhaInputRef}
          selectTextOnFocus
          secureTextEntry={true}
          blurOnSubmit={false}
          onSubmitEditing={() => confirmarSenhaInputRef.current?.focus()}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <InputText
          placeholder='Confirmar Senha'
          ref={confirmarSenhaInputRef}
          selectTextOnFocus
          secureTextEntry={true}
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
        />
      </View>

      <ThemedButton
        // @ts-ignore
        pinBottom
        fontWeight={'bold'}
        fontSize={20}
        disabled={isLoading}
        opacity={isLoading ? 0.5 : 1}
        borderRadius={0}
        onPress={handleSubmit}
      >
        {isLoading ? 'Carregando...' : 'Finalizar cadastro'}
      </ThemedButton>
    </View>
  )
}
