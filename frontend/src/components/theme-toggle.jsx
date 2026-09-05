import { Moon, Sun } from "lucide-react"

import { useThemeContext } from "@/components/context/theme"
import { Button } from "@/components/ui/button"

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useThemeContext()
  const ThemeIcon = isDark ? Sun : Moon

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      className={className}
      onClick={toggleTheme}
    >
      <ThemeIcon className="size-4" />
    </Button>
  )
}

export default ThemeToggle
