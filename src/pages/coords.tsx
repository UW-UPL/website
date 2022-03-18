import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";

const CoordsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const { allPeopleYaml, allFile} = data;

  const coords = [];

  for (let i = 0; i < allPeopleYaml.edges.length; i++) {
    if (allPeopleYaml.edges[i].node.coord) {
      coords.push({
        data: allPeopleYaml.edges[i].node,
        image: getImage(allFile.edges[i].node)
      });
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      {coords.map((c) => (
        <div>
          <h1>{c.data.name}</h1>
          <GatsbyImage image={c.image} alt={c.data.name} />
        </div>
      ))}
    </Layout>
  );
};

export default CoordsIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: { sourceInstanceName: { eq: "people" }, extension: { ne: "yml" } }
      sort: { order: ASC, fields: absolutePath }
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              width: 200
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
    allPeopleYaml(sort: { order: ASC, fields: name }) {
      edges {
        node {
          id
          coord
          name
          url
        }
      }
    }
  }
`;
