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
          <Card.Header>
            <Text fontSize={'$4'}>{card.label}</Text>

            <XStack gap={4}>
              <Text
                fontSize={'$8'}
                fontWeight={'700'}
                color={'$text-primary'}
              >
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
