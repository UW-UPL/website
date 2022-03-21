import * as React from "react";
import { graphql } from "gatsby";
import { Heading } from "@chakra-ui/react";

import Layout from "../components/layout";

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location}>
      <Heading size="4xl">Hi</Heading>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
