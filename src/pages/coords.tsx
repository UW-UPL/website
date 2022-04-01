import * as React from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import PageContainer from "../components/page-container";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Person, { IPerson } from "../components/person";

const CoordsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const { allPeopleYaml, allFile } = data;

  let coords: IPerson[] = [];
  let facultyAdvisors: IPerson[] = [];

  for (let i = 0; i < allPeopleYaml.nodes.length; i++) {
    const person: IPerson = {
      data: allPeopleYaml.nodes[i],
      image: getImage(allFile.nodes[i]),
    };
    if (allPeopleYaml.nodes[i].coord) {
      coords.push(person);
    } else if (allPeopleYaml.nodes[i].facultyadvisor) {
      facultyAdvisors.push(person);
    }
  }

  // coords = [...coords, ...coords];

  return (
    <Layout location={location}>
      <PageContainer>
        <Heading textAlign="center" mb="7">
          Meet the Coords
        </Heading>
        <Text textAlign="center" mb="14">
          These coordinators run the UPL day-to-day. If you have any questions,
          reach out to [EMAIL]
        </Text>
        {/* <Box sx={{ columns: "4 auto", columnGap: "3.5rem" }}>
          {coords.map((c) => (
            <Person key={c.data.name} person={c} />
          ))}
        </Box> */}
        <SimpleGrid columns={4} spacing="12" alignItems="flex-start">
          {coords.map((c) => (
            <Person key={c.data.name} person={c} />
          ))}
        </SimpleGrid>
      </PageContainer>
      <PageContainer>
        <Heading textAlign="center" mt="7" mb="7">
          Faculty Advisor
        </Heading>
        <Text textAlign="center" mb="14">
          Our faculty advisory is Professor Bart Miller, who can be contacted at
          [EMAIL]
        </Text>
        <Flex justifyContent="center">
          {facultyAdvisors.map((c) => (
            <Person key={c.data.id} person={c} />
          ))}
        </Flex>
      </PageContainer>
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
        bio
        coord
        facultyadvisor
        grade
        github
        linkedin
        name
        study
        url
      }
    }
  }
`;
