import React, { createContext, useState, useContext, ReactNode } from 'react';
import { StatusBar } from 'react-native';

// Theme types
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  cardBackground: string;
  buttonBackground: string;
  buttonText: string;
}

interface Theme {
  dark: boolean;
  colors: ThemeColors;
}

// Light and Dark themes
const LightThemeColors: ThemeColors = {
  primary: '#007AFF',
  secondary: '#34C759',
  background: '#FFFFFF',
  text: '#000000',
  cardBackground: '#F0F0F0',
  buttonBackground: '#007AFF',
  buttonText: '#FFFFFF',
};

const DarkThemeColors: ThemeColors = {
  primary: '#8AB4F8',
  secondary: '#81C995',
  background: '#202124',
  text: '#E8EAED',
  cardBackground: '#2C2E33',
  buttonBackground: '#8AB4F8',
  buttonText: '#202124',
};

export const themes = {
  light: { dark: false, colors: LightThemeColors },
  dark: { dark: true, colors: DarkThemeColors },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(themes.light);

  const toggleTheme = () => {
    const next = theme.dark ? themes.light : themes.dark;
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      {children}
    </ThemeContext.Provider>
  );
};
