import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Lato, sans-serif",
    body: "Montserrat, sans-serif",
  },
  styles: {
    global: {
      body: {
        color: "gray.700",
      },
    },
  },
});
