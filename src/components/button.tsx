import { Button, styled } from 'tamagui'

export const ThemedButton = styled(Button, {
  size: '$5',
  elevation: 4,
  backgroundColor: '$primary7',
  color: '$text-white',
  fontWeight: 'bold',
  fontSize: 20,

  variants: {
    pinBottom: {
      true: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderRadius: 0,
      },
    },
  },
})
