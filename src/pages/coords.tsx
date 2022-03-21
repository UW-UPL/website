import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";

const CoordsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const { allPeopleYaml, allFile } = data;

  const coords = [];

  for (let i = 0; i < allPeopleYaml.nodes.length; i++) {
    if (allPeopleYaml.nodes[i].coord) {
      coords.push({
        data: allPeopleYaml.nodes[i],
        image: getImage(allFile.nodes[i]),
      });
    }
  }

  return (
    <Layout location={location}>
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
      nodes {
        childImageSharp {
          gatsbyImageData(
            width: 200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    allPeopleYaml(sort: { order: ASC, fields: name }) {
      nodes {
        id
        coord
        name
        url
      }
    }
  }
`;
