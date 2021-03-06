import * as React from "react";
import { Link, graphql } from "gatsby";
import { Heading } from "@chakra-ui/react";

import Layout from "../components/layout";

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Heading>Undergraduate Projects Lab</Heading>
      <Link to={"/events"}>Events</Link>
      <Link to={"/blog"}>Blog</Link>
      <Link to={"/coords"}>Coords</Link>
      <Link to={"/hours"}>Hours</Link>
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
