import { DEFAULT_STORAGE_KEY } from "@/constant/theme-constant";
import ThemeProviderContext from "@/context/theme-context";
import { getSystemTheme } from "@/lib/theme-utils";
import { Theme, ThemeProviderProps } from "@/types";
import { useEffect, useState } from "react";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = DEFAULT_STORAGE_KEY,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = getSystemTheme();

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
