import * as React from "react";
import { graphql } from "gatsby";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";

import Layout from "../components/layout";
import PageContainer from "../components/page-container";

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location}>
      <PageContainer>
        <VStack spacing="10" alignItems="flex-start" mt="40" maxW="4xl">
          <Heading size="4xl">
            The UPL is the place to <Text color="red.500">have fun.</Text>
          </Heading>
          <Button colorScheme="red" leftIcon={<FaDiscord />}>
            Join the Discord
          </Button>
        </VStack>
      </PageContainer>
      <Box
        display="inline-block"
        p="8"
        mt="20"
        bg="red.100"
        borderRightRadius="2xl"
      >
        <Text fontSize="sm" color="gray.600" textTransform="uppercase">
          Coming Up &middot; Feb 12, 5:00 PM
        </Text>
        <Text color="gray.600">
          Lightning Talk with Michael Gira: How to Heely
        </Text>
        <Text fontSize="sm" color="gray.600">
          Location: CS 1240
        </Text>
      </Box>
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
