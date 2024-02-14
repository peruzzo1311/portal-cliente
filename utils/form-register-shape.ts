import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  familyName: yup.string().required('O sobrenome é obrigatório'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve conter pelo menos 6 caracteres.')
    .max(20, 'A senha deve conter no máximo 20 caracteres.')

    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*]).{6,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
    ),
  passwordConfirm: yup
    .string()
    .required('A confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
})

export default schema
