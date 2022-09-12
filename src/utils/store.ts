import create from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'dark' | 'light';

interface ThemeProps {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeProps>()(
  persist((set) => ({
    theme: 'dark',
    setTheme: (mode: ThemeMode) => set(() => ({ theme: mode })),
    // setTheme: (mode: ThemeMode) =>
    //   set((state) => ({ theme: state.theme, mode })),
  }))
);
