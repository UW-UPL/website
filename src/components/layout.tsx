import * as React from "react";
import Navbar from "./navbar";
import PageContainer from "./page-container";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Footer from "./footer";
import { theme } from "./theme";

/** @TODO Remove any font weights that we don't use. Also, this probably should go in a gatsby-browser.js */
import "@fontsource/lato/100.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";

import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";

declare const __PATH_PREFIX__: string;

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <ChakraProvider theme={theme}>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <PageContainer>
          <Box pt="10" pb="16">
            <Navbar isRootPath={isRootPath} />
          </Box>
        </PageContainer>
        <main>{children}</main>
        <Footer />
      </div>
    </ChakraProvider>
  );
};

export default Layout;
