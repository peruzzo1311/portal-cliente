import { createAnimations } from '@tamagui/animations-react-native'
import { createInterFont } from '@tamagui/font-inter'
import { createMedia } from '@tamagui/react-native-media-driver'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createTamagui, createTokens } from 'tamagui'

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  '150ms': {
    type: 'timing',
    duration: 150,
  },
  '200ms': {
    type: 'timing',
    duration: 200,
  },
})

const token = createTokens({
  ...tokens,
  color: {
    ...tokens.color,
    primary1: 'hsl(208, 100%, 97%)',
    primary2: 'hsl(208, 94%, 94%)',
    primary3: 'hsl(204, 94%, 86%)',
    primary4: 'hsl(203, 97%, 74%)',
    primary5: 'hsl(202, 94%, 60%)',
    primary6: 'hsl(202, 89%, 48%)',
    primary7: 'hsl(204, 99%, 37%)',
    primary8: 'hsl(205, 98%, 32%)',
    primary9: 'hsl(204, 91%, 27%)',
    primary10: 'hsl(206, 80%, 24%)',
    primary11: 'hsl(208, 80%, 16%)',
    appBackground: '#F5F5F5',
    'text-primary': '#303030',
    'text-secondary': '#9E9E9E',
    'text-white': '#F5F5F5',
  },
})

const headingFont = createInterFont()
const bodyFont = createInterFont()
const config = createTamagui({
  animations,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens: token,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})

export type AppConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
