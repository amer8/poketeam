import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextValue {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const COLOR_MODE_STORAGE_KEY = "color-mode";

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

function getPreferredColorMode(): ColorMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedColorMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  if (storedColorMode === "light" || storedColorMode === "dark") {
    return storedColorMode;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyColorMode(colorMode: ColorMode) {
  document.documentElement.dataset.colorMode = colorMode;
}

function getInitialColorMode(): ColorMode {
  if (typeof document !== "undefined") {
    const rootColorMode = document.documentElement.dataset.colorMode;
    if (rootColorMode === "light" || rootColorMode === "dark") {
      return rootColorMode;
    }
  }

  return getPreferredColorMode();
}

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);

  useEffect(() => {
    applyColorMode(colorMode);
  }, [colorMode]);

  const value = useMemo<ColorModeContextValue>(
    () => ({
      colorMode,
      toggleColorMode: () => {
        setColorMode((currentMode) => {
          const nextMode = currentMode === "light" ? "dark" : "light";
          window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextMode);
          applyColorMode(nextMode);
          return nextMode;
        });
      },
    }),
    [colorMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const value = useContext(ColorModeContext);
  if (!value) {
    throw new Error("useColorMode must be used within ColorModeProvider");
  }

  return value;
}
