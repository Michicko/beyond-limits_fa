import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import merge from "deepmerge";

const fonts = {
  font: { value: "--roboto" },
};

const lightColors = {
  white: { value: "#ffffff" },
  background: { value: "#ffffff" },
  neutral: { value: "#e4e4e7" },
  card_bg: { value: "#F8F7F7" },
  surface: { value: "#ffffff" },
  primary: { value: "#327BC0" },
  primary_variant: { value: "#1a4165" },
  secondary: { value: "#ffeb80" },
  secondary_variant: { value: "#D79B00" },
  error: { value: "#D7002C" },
  warning: { value: "#FFD700" },
  success: { value: "#02CD49" },
  text_lg: { value: "#000000" },
  text_md: { value: "#262626" },
  text_base: { value: "#262626" },
};

const darkColors = {
  white: { value: { base: "#ffffff", _dark: "#121212" } },
  background: { value: { base: "#ffffff", _dark: "#121212" } },
  neutral: { value: { base: "#e4e4e7", _dark: "rgba(38, 37, 40, 0.54)" } },
  card_bg: { value: { base: "#F8F7F7", _dark: "rgba(38, 37, 40, 0.54)" } },
  surface: { value: { base: "#ffffff", _dark: "#121212" } },
  primary: { value: { base: "#327BC0", _dark: "#9ac0e5" } },
  primary_variant: { value: { base: "#01305B", _dark: "#01305B" } },
  secondary: { value: { base: "#ffeb80", _dark: "#ffeb80" } },
  secondary_variant: { value: { base: "#D79B00", _dark: "#ffeb80" } },
  error: { value: { base: "#D7002C", _dark: "rgba(235, 128, 150, .7)" } },
  warning: { value: { base: "#FFD700", _dark: "rgba(255, 235, 128, .7)" } },
  success: { value: { base: "#02CD49", _dark: "rgba(129, 230, 164, .7)" } },
  text_lg: { value: { base: "#000000", _dark: "rgba(255, 255, 255, .87)" } },
  text_md: { value: { base: "#262626", _dark: "rgba(255, 255, 255, .60)" } },
  text_base: { value: { base: "#262626", _dark: "rgba(255, 255, 255, .38)" } },
};

const config = defineConfig({
  theme: {
    tokens: {
      fonts,
      colors: lightColors,
    },
    semanticTokens: {
      colors: darkColors,
    },
  },
});

const mergedConfig = merge(defaultConfig, config);
export const system = createSystem(mergedConfig);
