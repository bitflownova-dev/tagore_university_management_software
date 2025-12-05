import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1565C0', // Tagore primary blue
    secondary: '#FFA726', // Tagore secondary gold
    accent: '#0D47A1', // Darker blue
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#F57C00',
    info: '#1976D2',
  },
  roundness: 8,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'Roboto',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Roboto',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'Roboto',
      fontWeight: '700',
    },
  },
};

export type AppTheme = typeof theme;
