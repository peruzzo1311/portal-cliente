import { X } from '@tamagui/lucide-icons'
import { Button, Dialog, Text, Unspaced } from 'tamagui'

type RegisterFeedbackDialogProps = {
  username: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  navigation: any
}

export default function RegisterFeedbackDialog({
  username,
  open,
  setOpen,
  navigation,
}: RegisterFeedbackDialogProps) {
  const handleNavigation = () => {
    navigation.navigate('Login')

    setOpen(false)
  }

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          key='overlay'
          animation='quick'
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key='content'
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap='$4'
          width={'90%'}
          maxWidth={500}
        >
          <Dialog.Title>Usuário criado com sucesso!</Dialog.Title>

          <Dialog.Description>
            <Text>
              Para fazer login na plataforma, utilize o seu nome de usuário:{' '}
              <Text fontWeight={'bold'}>{username}</Text>
            </Text>
          </Dialog.Description>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position='absolute'
                top='$3'
                right='$3'
                size='$2'
                circular
                icon={X}
                onPress={handleNavigation}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
