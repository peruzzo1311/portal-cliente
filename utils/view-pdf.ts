import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

export default function viewPdf(base64: string, numNfv: number) {
  const dirs = RNFetchBlob.fs.dirs
  const path = `${dirs.DocumentDir}/nota_${numNfv}.pdf`

  RNFetchBlob.fs
    .writeFile(path, base64, 'base64')
    .then(() => {
      if (Platform.OS === 'ios') {
        RNFetchBlob.ios.openDocument(path)
      } else {
        RNFetchBlob.fs.scanFile([{ path: path, mime: 'application/pdf' }])
        RNFetchBlob.android.actionViewIntent(path, 'application/pdf')
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
}
