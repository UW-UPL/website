import * as React from "react";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import {
  AspectRatio,
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

export interface IPerson {
  image: IGatsbyImageData;
  data: {
    id: string;
    name: string;
    coord: boolean;
    facultyadvisor: boolean | null;
    grade: string | null;
    study: string | null;
    url: string | null;
    github: string | null;
    linkedin: string | null;
    bio: string | null;
  };
}

interface PersonProps {
  person: IPerson;
}

const Person: React.FC<PersonProps> = ({ person }) => {
  const titles: string[] = [];
  if (person.data.grade) {
    titles.push(person.data.grade);
  }
  if (person.data.study) {
    titles.push(person.data.study);
  }

  const links: JSX.Element[] = [];
  if (person.data.url) {
    links.push(
      <Link key="url" href={person.data.url} isExternal>
        <Icon as={FaLink} boxSize="4" />
      </Link>
    );
  }
  if (person.data.github) {
    links.push(
      <Link
        key="github"
        href={`https://github.com/${person.data.github}`}
        isExternal
      >
        <Icon as={FaGithub} boxSize="5" />
      </Link>
    );
  }
  if (person.data.linkedin) {
    links.push(
      <Link
        key="linkedin"
        href={`https://linkedin.com/in/${person.data.linkedin}`}
        isExternal
      >
        <Icon as={FaLinkedin} boxSize="5" />
      </Link>
    );
  }

  return (
    <Box
      display="inline-block"
      w="100%"
      mb={10}
      bg="red.50"
      borderRadius="xl"
      boxShadow="xl"
      sx={{ breakInside: "avoid" }}
    >
      <AspectRatio ratio={1}>
        <Image
          as={GatsbyImage}
          image={person.image}
          alt={person.data.name}
          w="100%"
          borderTopRadius="xl"
        />
      </AspectRatio>
      <Box p={4} pb={5}>
        {titles.length > 0 && (
          <Text
            mb="1"
            fontSize="xs"
            fontWeight="medium"
            textTransform="uppercase"
          >
            {titles.join(" · ")}
          </Text>
        )}
        <Text fontSize="xl" fontWeight="bold">
          {person.data.name}{" "}
        </Text>
        {links.length > 0 && <HStack spacing="1.5">{links}</HStack>}
        {person.data.bio && (
          <Text mt="2" color="gray.600" fontSize="sm">
            {person.data.bio}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Person;
