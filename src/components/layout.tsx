import * as React from "react";
import { Link } from "gatsby";
import Navbar from "./navbar";
import PageContainer from "./page-container";

declare const __PATH_PREFIX__: string;

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      {/* <header className="global-header">{header}</header> */}
      <PageContainer>
        <Navbar isRootPath={isRootPath} />
        <main>{children}</main>
      </PageContainer>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
