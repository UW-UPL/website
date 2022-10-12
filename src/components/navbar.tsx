import * as React from "react";
import { Link as GLink } from "gatsby";
import { Flex, Heading, HStack, Link as CLink, Spacer } from "@chakra-ui/react";

interface Route {
  path: string;
  name: string;
}

const ROUTES: Route[] = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/events",
    name: "Events",
  },
  {
    path: "/blog",
    name: "Blog",
  },
  {
    path: "/coords",
    name: "Coords",
  },
  {
    path: "/hours",
    name: "Hours",
  },
];

interface NavbarProps {
  isRootPath: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Flex as="header">
      <Heading as={GLink} to="/" color="red.500">
        Undergraduate Projects Lab
      </Heading>
      <Spacer />
      <HStack spacing="10" alignItems="flex-end">
        {ROUTES.map((route) => (
          <CLink
            key={route.path}
            as={GLink}
            to={route.path}
            color="red.500"
            fontWeight="bold"
          >
            {route.name}
          </CLink>
        ))}
      </HStack>
    </Flex>
  );
};

export default Navbar;
