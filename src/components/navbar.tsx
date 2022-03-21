import * as React from "react";
import { Link as GLink } from "gatsby";
import { Heading, Link as CLink } from "@chakra-ui/react";

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
    <header>
      <Heading as={GLink} to="/">
        Undergraduate Projects Lab
      </Heading>
      {ROUTES.map((route) => (
        <CLink as={GLink} to={route.path}>
          {route.name}
        </CLink>
      ))}
    </header>
  );
};

export default Navbar;
