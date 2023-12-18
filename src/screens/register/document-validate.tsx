import { validateDocument } from '@/api/register'
import { ThemedButton } from '@/components/button'
import { InputText } from '@/components/text-input'
import handleError from '@/utils/handle-error'
import { Check, ChevronLeft } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { useRef, useState } from 'react'
import { Button, Checkbox, Label, Text, View } from 'tamagui'

export default function DocumentValidate({ navigation }: { navigation: any }) {
  const [documentInvalid, setDocumentInvalid] = useState(true)
  const [documentType, setDocumentType] = useState<'cpf' | 'cnpj'>('cpf')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<any>(null)
  const toast = useToastController()

  const formatCPF = (value: string) => {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    return value
  }

  const formatCNPJ = (value: string) => {
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
    return value
  }

  const handleDocumentChange = (value: string) => {
    value = value.replace(/\D/g, '')
    setDocumentInvalid(true)

    if (documentType === 'cpf') {
      value = formatCPF(value)

      if (value.length === 14) {
        setDocumentInvalid(false)

        if (inputRef.current) {
          inputRef.current.focus()
        }
      }
    } else {
      value = formatCNPJ(value)

      if (value.length === 18) {
        setDocumentInvalid(false)

        if (inputRef.current) {
          inputRef.current.focus()
        }
      }
    }

    setDocument(value)
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const formatedDocument = document.replace(/\D/g, '')
      const res = await validateDocument(
        formatedDocument,
        documentType,
        email.trim()
      )

      if (res.codRet === 0) {
        const codCli = res.codCli
        navigation.navigate('Register', {
          codCli,
          email,
        })
      } else {
        toast.show(res.msgRet)
      }
    } catch (error: any) {
      toast.show(handleError(error))
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
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft color={'$primary7'} size={40} />
      </Button>

      <Text
        marginTop={12}
        fontSize={20}
        fontWeight={'700'}
        color={'$text-primary'}
      >
        Insira credenciais válidas para continuar
      </Text>

      <View flexDirection='row' alignItems='center' gap={24}>
        <View flexDirection='row' alignItems='center' gap={8}>
          <Checkbox
            size='$5'
            id='cpf'
            borderWidth={2}
            onCheckedChange={() => setDocumentType('cpf')}
            checked={documentType === 'cpf'}
            backgroundColor={documentType === 'cpf' ? '$primary7' : '#fff'}
            borderColor={documentType === 'cpf' ? '$primary7' : '#ddd'}
            disabled={isLoading}
            pressStyle={{ scale: 0.9 }}
            animation={'bouncy'}
            marginVertical={24}
          >
            <Checkbox.Indicator>
              <Check color={'#fff'} />
            </Checkbox.Indicator>
          </Checkbox>

          <Label htmlFor='cpf' fontSize={16}>
            CPF
          </Label>
        </View>

        <View flexDirection='row' alignItems='center' gap={8}>
          <Checkbox
            size='$5'
            id='cnpj'
            borderWidth={2}
            onCheckedChange={() => setDocumentType('cnpj')}
            checked={documentType === 'cnpj'}
            backgroundColor={documentType === 'cnpj' ? '$primary7' : '#fff'}
            borderColor={documentType === 'cnpj' ? '$primary7' : '#ddd'}
            disabled={isLoading}
            pressStyle={{ scale: 0.9 }}
            animation={'bouncy'}
            marginVertical={24}
          >
            <Checkbox.Indicator>
              <Check color={'#fff'} />
            </Checkbox.Indicator>
          </Checkbox>

          <Label htmlFor='cnpj' fontSize={16}>
            CNPJ
          </Label>
        </View>
      </View>

      <Label fontSize={16}>{documentType === 'cpf' ? 'CPF' : 'CNPJ'}</Label>
      <InputText
        placeholder={
          documentType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'
        }
        value={document}
        disabled={isLoading}
        maxLength={documentType === 'cpf' ? 14 : 18}
        onChangeText={handleDocumentChange}
        marginBottom={16}
        selectTextOnFocus
        autoFocus
      />

      <Label fontSize={16}>Email</Label>
      <InputText
        value={email}
        disabled={isLoading}
        autoComplete='email'
        selectTextOnFocus
        placeholder='Digite seu email'
        onChangeText={setEmail}
        ref={inputRef}
      />

      <ThemedButton
        // @ts-ignore
        pinBottom
        disabled={isLoading || documentInvalid}
        opacity={documentInvalid || isLoading ? 0.5 : 1}
        borderRadius={0}
        onPress={handleSubmit}
      >
        {isLoading ? 'Carregando...' : 'Continuar'}
      </ThemedButton>
    </View>
  )
}
