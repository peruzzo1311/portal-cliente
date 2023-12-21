import { useState } from 'react'
import {
  AnimatePresence,
  Card,
  ListItem,
  Separator,
  SizableText,
  Tabs,
  YStack,
} from 'tamagui'
import { AnimatedYStack } from './tab-animated'

type Pagamento = {
  vctPro: string
  vlrAbe: number
}

type PagamentoPeriodo = {
  vlrAbe: number
  descricao: string
}

type Props = {
  pagamentos: Pagamento[]
  pagamentosPeriodo: PagamentoPeriodo[]
}

type tabs = 'pagamentos' | 'pagamentosPeriodo' | string

export default function Graphs({ pagamentos, pagamentosPeriodo }: Props) {
  const [currentTab, setCurrentTab] = useState<tabs>('pagamentos')

  return (
    <Card
      borderWidth={1}
      borderColor={'$borderColor'}
      borderTopWidth={5}
      borderTopColor={'$primary7'}
      backgroundColor={'#FFF'}
      padding={'$1'}
    >
      <Card.Header>
        <SizableText fontSize={'$5'}>Pagamentos</SizableText>
      </Card.Header>

      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        activationMode='manual'
        flexDirection='column'
      >
        <Tabs.List aria-label='Listagem de pagamentos'>
          <Tabs.Tab
            flex={1}
            value='pagamentos'
            backgroundColor={
              currentTab === 'pagamentos' ? '$primary7' : '$appBackground'
            }
          >
            <SizableText
              color={
                currentTab === 'pagamentos' ? '$text-white' : '$text-primary'
              }
              fontWeight={currentTab === 'pagamentos' ? '700' : '400'}
            >
              Próximos 6 dias
            </SizableText>
          </Tabs.Tab>

          <Tabs.Tab
            backgroundColor={
              currentTab === 'pagamentosPeriodo'
                ? '$primary7'
                : '$appBackground'
            }
            flex={1}
            value='pagamentosPeriodo'
          >
            <SizableText
              color={
                currentTab === 'pagamentosPeriodo'
                  ? '$text-white'
                  : '$text-primary'
              }
              fontWeight={currentTab === 'pagamentosPeriodo' ? '700' : '400'}
            >
              Por período
            </SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <Separator />

        <AnimatePresence
          exitBeforeEnter
          enterVariant={currentTab === 'pagamentos' ? 'isLeft' : 'isRight'}
          exitVariant={currentTab === 'pagamentos' ? 'isRight' : 'isLeft'}
        >
          <AnimatedYStack
            key={currentTab}
            animation={'200ms'}
            x={0}
            opacity={1}
          >
            <Tabs.Content value={currentTab} forceMount>
              <YStack separator={<Separator />}>
                {currentTab === 'pagamentos'
                  ? pagamentos.map((pagamento, index) => (
                      <ListItem
                        key={index}
                        title={pagamento.vctPro}
                        subTitle={pagamento.vlrAbe.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      />
                    ))
                  : pagamentosPeriodo.map((pagamento, index) => (
                      <ListItem
                        key={index}
                        title={pagamento.descricao}
                        subTitle={pagamento.vlrAbe.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      />
                    ))}
              </YStack>
            </Tabs.Content>
          </AnimatedYStack>
        </AnimatePresence>
      </Tabs>
    </Card>
  )
}
