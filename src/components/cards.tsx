import { Card, Text, XStack, YStack } from 'tamagui'

type Card = {
  label: string
  value: number
}

type Props = {
  cards: Card[]
}

export default function Cards({ cards }: Props) {
  return (
    <YStack gap={'$4'}>
      {cards.map((card, index) => (
        <Card
          borderWidth={1}
          borderColor={'$borderColor'}
          borderTopWidth={5}
          borderTopColor={'#0171BB'}
          backgroundColor={'#FFF'}
          key={index}
        >
          <Card.Header paddingHorizontal={'$4'} paddingVertical={'$5'}>
            <Text fontSize={'$4'} fontWeight={'700'} color={'$text-secondary'}>
              {card.label}
            </Text>

            <XStack gap={4}>
              <Text fontSize={'$9'} fontWeight={'700'} color={'$text-primary'}>
                {card.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
            </XStack>
          </Card.Header>
        </Card>
      ))}
    </YStack>
  )
}
