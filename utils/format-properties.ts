type FormatPropertiesProps = {
  name: string
  value: string
}

type FormatPropertiesReturn = {
  codCli: string
}

const FormatProperties = (
  properties: FormatPropertiesProps[]
) => {
  let data = {} as FormatPropertiesReturn

  properties.forEach(property => {
    const { name, value } = property

    if (name.toLowerCase() === 'codcli') {
      data = {
        codCli: value,
      }
    }
  })

  return data
}

export default FormatProperties
