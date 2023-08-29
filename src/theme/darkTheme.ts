import { DefaultTheme } from '@react-navigation/native'

export const darkTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F00',
    secondary: '#0F0',
    tertiary: 'white',
    black: '#070B2D',
    purple: '#425FF4',
    white: '#ffffff',
    background: '#EFEFF8',
    placeholder: '#adadad',
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    largePlus: 24,
    big: 30,
  },
  font: 'Roboto',
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    bold: 'bold',
  },
  border: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 4,
  },
}
