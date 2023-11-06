type FormatPropertiesProps = {
  name: string
  value: string
}

const FormatProperties = (properties: FormatPropertiesProps[]) => {
  let data = {}

  properties.forEach((property) => {
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
