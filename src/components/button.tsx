import { Button, GetProps, styled } from 'tamagui'

export const ThemedButton = styled(Button, {
  size: '$5',
  elevation: 4,
  backgroundColor: '$primary7',
  color: '$text-white',
  fontWeight: 'bold',
  fontSize: 20,

  animation: '150ms',
  pressStyle: {
    backgroundColor: '$primary2',
  },

  variants: {
    pinBottom: {
      true: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
      },
    },
  },
})

export type ThemedButtonProps = GetProps<typeof ThemedButton>
