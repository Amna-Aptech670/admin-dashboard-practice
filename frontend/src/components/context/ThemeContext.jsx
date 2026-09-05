import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes"

import { ThemeContext } from "./theme"

const ThemeContextValue = ({ children }) => {
  const { resolvedTheme, setTheme, theme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const ThemeProvider = ({ children }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeContextValue>{children}</ThemeContextValue>
    </NextThemeProvider>
  )
}
