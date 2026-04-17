import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextValue {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const COLOR_MODE_STORAGE_KEY = "color-mode";

const ColorModeContext = createContext<ColorModeContextValue | null>(null);
const DEFAULT_COLOR_MODE: ColorMode = "light";
const colorModeListeners = new Set<() => void>();

function subscribeToColorMode(listener: () => void) {
  colorModeListeners.add(listener);
  return () => {
    colorModeListeners.delete(listener);
  };
}

function notifyColorModeListeners() {
  colorModeListeners.forEach((listener) => listener());
}

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

function getCurrentColorMode(): ColorMode {
  if (typeof document !== "undefined") {
    const rootColorMode = document.documentElement.dataset.colorMode;
    if (rootColorMode === "light" || rootColorMode === "dark") {
      return rootColorMode;
    }
  }

  return getPreferredColorMode();
}

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const colorMode = useSyncExternalStore(
    subscribeToColorMode,
    getCurrentColorMode,
    () => DEFAULT_COLOR_MODE,
  );

  useEffect(() => {
    const rootColorMode = document.documentElement.dataset.colorMode;
    if (rootColorMode !== "light" && rootColorMode !== "dark") {
      applyColorMode(colorMode);
    }
  }, [colorMode]);

  const value = useMemo<ColorModeContextValue>(
    () => ({
      colorMode,
      toggleColorMode: () => {
        const nextMode = colorMode === "light" ? "dark" : "light";
        window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextMode);
        applyColorMode(nextMode);
        notifyColorModeListeners();
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
