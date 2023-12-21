import Titulo from './Titulo'
import NotaFiscal from './nota-fiscal'

export interface RequestBase {
  codRet: number
  msgRet: string
}

export interface FaturaMesAtual extends RequestBase {
  vlrFat: number
}

export interface FaturaMesAnterior extends RequestBase {
  vlrFat: number
}

export interface ExportaPagamentos extends RequestBase {
  titulo: {
    vctPro: string
    vlrAbe: number
  }[]
}

export interface ExportaPagamentosPeriodo extends RequestBase {
  periodo: {
    vlrAbe: number
    descricao: string
  }[]
}

export interface ExportaTitulos extends RequestBase {
  titulos: Titulo[]
}

export interface BaixarTitulo extends RequestBase {
  pdfBol: string
}

export interface ExportaNotas extends RequestBase {
  notas: NotaFiscal[]
}

export interface BaixarNota extends RequestBase {
  pdfNfe: string
}

export interface BaixarNotaXml extends RequestBase {
  xmlNfe: { string: string }[]
}

export interface ValidateDocument extends RequestBase {
  codCli: number
}
