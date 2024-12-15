/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Brand Colors
const terracotta = '#E2725B'; // Primary: warmth, authenticity
const ochreYellow = '#CC7722'; // Secondary: wisdom, optimism
const creamyWhite = '#F5F5DC'; // Accent: soft, neutral
const darkAccent = '#2A2A22'; // Dark mode accent: darker variant of creamyWhite

export const Colors = {
  light: {
    text: '#11181C',
    background: creamyWhite,
    tint: terracotta,
    icon: ochreYellow,
    tabIconDefault: '#687076',
    tabIconSelected: terracotta,
    primary: terracotta,
    secondary: ochreYellow,
    accent: creamyWhite,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: creamyWhite,
    icon: ochreYellow,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: creamyWhite,
    primary: terracotta,
    secondary: ochreYellow,
    accent: darkAccent,
  },
};
