const handleError = (error: any) => {
  const status = error.response?.status
  const messages: any = {
    401: 'Usuário ou senha incorretos.',
    500: 'Servidor indisponível, tente novamente mais tarde.',
  }
  const message = messages[status] || 'Ocorreu um erro inesperado.'

  console.error('Erro:', error)

  return message
}

export default handleError
