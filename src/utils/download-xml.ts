import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

export default function DownloadXml(base64: string, numNfv: number) {
  const dirs = RNFetchBlob.fs.dirs
  const path = `${dirs.DocumentDir}/nota_${numNfv}.xml`

  RNFetchBlob.fs
    .writeFile(path, base64, 'base64')
    .then(() => {
      if (Platform.OS === 'ios') {
        RNFetchBlob.ios.openDocument(path)
      } else {
        RNFetchBlob.fs.scanFile([{ path: path, mime: 'application/xml' }])
        RNFetchBlob.android.actionViewIntent(path, 'application/xml')
      }
    })
    .catch((err) => {
      console.log(err.message)
    })

  return path
}
