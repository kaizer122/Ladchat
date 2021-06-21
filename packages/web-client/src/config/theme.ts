import { ColorHues, ColorMode, extendTheme, Theme } from "@chakra-ui/react";
type ParentColors = keyof Theme["colors"];

type Colors = ParentColors | `${ParentColors}.${keyof ColorHues}`;

type ColorByMode = [Colors, Colors];

interface IThemeColors {
  borderColor: ColorByMode;
  hoverColor: ColorByMode;
  primaryTextColor: ColorByMode;
  secondaryTextColor: ColorByMode;
  tertiaryTextColor: ColorByMode;
  bubbleSenderBgColor: ColorByMode;
  bubbleReceiverBgColor: ColorByMode;
  globalBg: ColorByMode;
}

const config = {
  initialColorMode: "light" as ColorMode,
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: "teal.500",
      },
    },
    IconButton: {
      defaultProps: {
        focusBorderColor: "teal.500",
      },
    },
  },
  shadows: {
    outline: "0 0 0 3px #319795",
  },
});

const themeColors: IThemeColors = {
  globalBg: ["white", "gray.800"],
  borderColor: ["gray.100", "gray.600"],
  hoverColor: ["gray.50", "gray.600"],
  primaryTextColor: ["teal.700", "teal.300"],
  secondaryTextColor: ["gray.700", "gray.300"],
  tertiaryTextColor: ["gray.500", "teal.400"],
  bubbleSenderBgColor: ["blue.50", "blue.500"],
  bubbleReceiverBgColor: ["gray.100", "gray.600"],
};

export { theme, themeColors };
