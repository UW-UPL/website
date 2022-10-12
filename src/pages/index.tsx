import * as React from "react";
import { graphql } from "gatsby";
import {
  Box,
  Button,
  Heading,
  HStack,
  ListItem,
  StackDivider,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";

import Layout from "../components/layout";
import PageContainer from "../components/page-container";

const FAQ: { q: string; a: string | JSX.Element }[] = [
  {
    q: "Do I need to be a CS major?",
    a: "No! While we're a CS focused organization, you don't need to be a CS major!",
  },
  {
    q: "Do I need to be an undergraduate student?",
    a: "No, you do not. Anyone who is a registered student with the University is welcome to use the machines and resources of the lab. We do have a few graduate students that frequent the lab as well.",
  },
  {
    q: "What resources are available through the UPL?",
    a: (
      <UnorderedList>
        <ListItem>A lab room in the CS building.</ListItem>
        <ListItem>Server infrastructure for project use.</ListItem>
        <ListItem>Books to check out.</ListItem>
        <ListItem>
          And of course, each other, to talk to about anything CS (and more!).
        </ListItem>
      </UnorderedList>
    ),
  },
  {
    q: "Can we still use the servers remotely?",
    a: "Yes! It is possible for us to remotely access our servers. If that interests you, talk to us! Server infrastructure is an ongoing project.",
  },
];

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location}>
      <PageContainer>
        <VStack spacing="10" alignItems="flex-start" pt="28" maxW="4xl">
          <Heading as="h1" size="4xl">
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
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="0.03em"
        >
          Coming Up &middot; Feb 12, 5:00 PM
        </Text>
        <Text mb="1" fontWeight="bold">
          Lightning Talk with Michael Gira: How to Heely
        </Text>
        <Text fontSize="sm" fontWeight="normal">
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
      <Box pt={14} pb={14}>
        <PageContainer>
          <Heading textAlign="center" mb="7">
            Frequently Asked Questions
          </Heading>
          <Box sx={{ columns: "2 auto", columnGap: "3.5rem" }}>
            {FAQ.map(({ q, a }) => {
              if (typeof a === "string") {
                a = <Text>{a}</Text>;
              }
              return (
                <Box pt="5" pb="5">
                  <VStack
                    alignItems="flex-start"
                    pt="8"
                    pb="8"
                    pl="16"
                    pr="16"
                    borderRadius="3xl"
                    border="1px solid"
                    borderColor="gray.50"
                    boxShadow="xl"
                  >
                    <Heading as="h3" mb="2" lineHeight="10">
                      {q}
                    </Heading>
                    {a}
                  </VStack>
                </Box>
              );
            })}
          </Box>
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
