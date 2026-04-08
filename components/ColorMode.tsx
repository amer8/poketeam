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

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const rootColorMode = document.documentElement.dataset.colorMode;
    const nextColorMode =
      rootColorMode === "light" || rootColorMode === "dark"
        ? rootColorMode
        : getPreferredColorMode();

    if (rootColorMode !== nextColorMode) {
      applyColorMode(nextColorMode);
    }

    setColorMode(nextColorMode);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    applyColorMode(colorMode);
  }, [colorMode, isInitialized]);

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
    [colorMode]
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
