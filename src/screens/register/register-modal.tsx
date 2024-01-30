import { login } from '@/api/login'
import { createUser } from '@/api/register'
import RegisterFeedbackDialog from '@/components/register-feedback-dialog'
import { InputText } from '@/components/text-input'
import { RegisterUser } from '@/types/User'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { useState } from 'react'
import {
  Controller,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Keyboard } from 'react-native'
import { Button, Text, View } from 'tamagui'
import schema from 'utils/form-register-shape'
import handleError from 'utils/handle-error'

type FormDataProps = {
  name: string
  familyName: string
  password: string
  passwordConfirm: string
}

export default function RegisterModal({
  route,
  navigation,
}: any) {
  const [openFeedback, setOpenFeedback] = useState(false)
  const [username, setUsername] = useState('')
  const { codCli, email } = route.params

  const toast = useToastController()
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting, isValid },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      familyName: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'all',
    shouldFocusError: true,
  })

  const handleRegister: SubmitHandler<
    FormDataProps
  > = async data => {
    try {
      const { token } = await login({
        username: 'weliton.ribeiro',
        password: 'S@p1ens',
      })

      const user: RegisterUser = {
        name: data.name,
        familyName: data.familyName,
        email: email,
        password: data.password,
        codCli: codCli,
        token: token,
      }

      const username = await createUser(user)

      if (username) {
        setUsername(username)

        setOpenFeedback(true)
        Keyboard.dismiss()
      }
    } catch (error: any) {
      toast.show(handleError(error))
    }
  }

  return (
    <View flex={1} padding={8} backgroundColor={'#FFF'}>
      <Button
        width={40}
        height={40}
        backgroundColor={'#FFF'}
        onPress={() => {
          navigation.goBack(), reset()
        }}
      >
        <ChevronLeft color={'$primary7'} size={40} />
      </Button>

      <View marginVertical={24} gap={16}>
        <Controller
          control={control}
          name='name'
          render={({
            field: { onChange, value, ref },
            fieldState: { invalid, error },
          }) => (
            <View>
              <InputText
                placeholder='Nome'
                value={value}
                onChangeText={onChange}
                error={invalid}
                ref={ref}
                blurOnSubmit={false}
                onSubmitEditing={() =>
                  setFocus('familyName')
                }
              />

              {error && (
                <Text fontSize={'$4'} color={'$red10'}>
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name='familyName'
          render={({
            field: { onChange, value, ref },
            fieldState: { invalid, error },
          }) => (
            <View>
              <InputText
                placeholder='Sobrenome'
                value={value}
                onChangeText={onChange}
                error={invalid}
                ref={ref}
                blurOnSubmit={false}
                onSubmitEditing={() => setFocus('password')}
              />

              {error && (
                <Text fontSize={'$4'} color={'$red10'}>
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({
            field: { onChange, value, ref },
            fieldState: { invalid, error },
          }) => (
            <View>
              <InputText
                placeholder='Senha'
                value={value}
                onChangeText={onChange}
                error={invalid}
                secureTextEntry={true}
                ref={ref}
                blurOnSubmit={false}
                onSubmitEditing={() =>
                  setFocus('passwordConfirm')
                }
              />

              {error && (
                <Text fontSize={'$4'} color={'$red10'}>
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name='passwordConfirm'
          render={({
            field: { onChange, value, ref },
            fieldState: { invalid, error },
          }) => (
            <View>
              <InputText
                placeholder='Confirmar Senha'
                value={value}
                onChangeText={onChange}
                error={invalid}
                secureTextEntry={true}
                ref={ref}
              />

              {error && (
                <Text fontSize={'$4'} color={'$red10'}>
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      <Button
        position='absolute'
        bottom={0}
        left={0}
        right={0}
        color={isValid ? '$text-white' : '$text-primary'}
        fontWeight={'bold'}
        size={'$5'}
        backgroundColor={isValid ? '$primary7' : '$gray5'}
        disabled={!isValid || isSubmitting}
        opacity={isSubmitting ? 0.5 : 1}
        borderRadius={0}
        onPress={handleSubmit(handleRegister)}
      >
        {isSubmitting ? 'Carregando' : 'Finalizar cadastro'}
      </Button>

      <RegisterFeedbackDialog
        username={username}
        open={openFeedback}
        setOpen={setOpenFeedback}
        navigation={navigation}
      />
    </View>
  )
}
