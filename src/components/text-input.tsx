import { Input, styled } from 'tamagui'

export const InputText = styled(Input, {
  borderWidth: 1,
  borderColor: '$primary7',
  backgroundColor: '#FFF',
  size: '$5',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
})
