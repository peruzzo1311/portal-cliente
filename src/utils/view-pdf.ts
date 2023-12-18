import ReactNativeBlobUtil from 'react-native-blob-util'

export default function viewPdf(base64: string, filename: string) {
  const dirs = ReactNativeBlobUtil.fs.dirs
  const path = `${dirs.DocumentDir}/${filename}.pdf`

  ReactNativeBlobUtil.fs
    .writeFile(path, base64, 'base64')
    .then(() => {
      ReactNativeBlobUtil.fs.scanFile([{ path: path, mime: 'application/pdf' }])
      ReactNativeBlobUtil.android.actionViewIntent(path, 'application/pdf')
    })
    .catch((err) => {
      console.log(err.message)
    })
}
