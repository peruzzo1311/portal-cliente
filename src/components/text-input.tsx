import { Input, styled } from 'tamagui'

export const InputText = styled(Input, {
  borderWidth: 1,
  borderColor: '$primary7',
  backgroundColor: '#FFF',
  size: '$5',

  focusStyle: {
    borderWidth: '$1',
    borderColor: '$primary7',
    backgroundColor: '$primary1',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },

    error: {
      true: {
        borderColor: '$red10',
      },
    },
  },
})
