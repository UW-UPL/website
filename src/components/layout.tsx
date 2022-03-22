import * as React from "react";
import { Link } from "gatsby";
import Navbar from "./navbar";
import PageContainer from "./page-container";
import { Box } from "@chakra-ui/react";
import Footer from "./footer";

declare const __PATH_PREFIX__: string;

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <PageContainer>
        <Box pt="10">
          <Navbar isRootPath={isRootPath} />
        </Box>
      </PageContainer>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
