"use client";

import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import { noto_sans_kr } from "@/constants/next-font";

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    typography: {
      fontFamily: noto_sans_kr.style.fontFamily,
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: "#1b60c6",
            light: "#20c1f5",
            dark: "#1c3d8d",
          },
          secondary: {
            main: "#ebae1c",
            light: "#ffe291",
            dark: "#cf7a1f",
          },
          common: {
            black: "rgb(52, 52, 52)",
          },
          error: {
            main: "rgb(225, 29, 72)",
          },
        },
      },
      dark: {
        palette: {
          // primary: {
          //   main: "#",
          // },
          // text: {
          //   primary: "#",
          //   secondary: "#",
          // },
          error: {
            main: "#ff5d65",
          },
        },
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
          },
        },
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              backgroundColor:
                theme.palette.mode === "light" ? theme.palette.primary.dark : theme.palette.primary.light,
              borderRadius: "0.5rem",
            };
          },
        },
      },
    },
  });
  return (
    <CssVarsProvider defaultMode="system" theme={theme}>
      {children}
    </CssVarsProvider>
  );
}
