import * as React from "react";
import { graphql } from "gatsby";
import {
  Box,
  Button,
  Heading,
  HStack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
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
        pl="16"
        mt="20"
        mb="24"
        bg="red.100"
        borderRightRadius="2xl"
      >
        <Text
          mb="1"
          fontSize="sm"
          color="gray.700"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="0.03em"
        >
          Coming Up &middot; Feb 12, 5:00 PM
        </Text>
        <Text mb="1" color="gray.700" fontWeight="bold">
          Lightning Talk with Michael Gira: How to Heely
        </Text>
        <Text fontSize="sm" color="gray.700" fontWeight="normal">
          Location: CS 1240
        </Text>
      </Box>
      <Box bg="gray.50" pt={14} pb={14}>
        <PageContainer>
          <HStack
            spacing={10}
            divider={<StackDivider />}
            alignItems="flex-start"
          >
            <Box flexBasis={0} flexGrow={1} flexShrink={1}>
              <Heading mb="4" color="red.500">
                Who we are...
              </Heading>
              <Text>
                The UPL is a social club. Stop by any time the room is open!
                Feel free to stop by between classes or as a place to eat your
                lunch. The UPL Coordinators are happy to answer questions, help
                you with homework, help you start a project, and more! Or, don’t
                come in with any goal at all! We’d love to meet you.
              </Text>
            </Box>
            <Box flexBasis={0} flexGrow={1} flexShrink={1}>
              <Heading mb="4" color="red.500">
                Who we are NOT...
              </Heading>
              <Text>
                The UPL itself does not do any projects. Rather, people within
                the lab do projects, and use the space as a way to connect with
                other UW students. Check out our blog to see what UPL’ers are up
                to.
              </Text>
            </Box>
          </HStack>
        </PageContainer>
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
