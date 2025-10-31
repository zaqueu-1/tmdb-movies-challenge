import { createContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextData {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);


