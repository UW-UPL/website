import * as React from "react";
import { Container } from "@chakra-ui/react";

const PageContainer: React.FC = ({ children }) => {
  return <Container maxW="container.xl">{children}</Container>;
};

export default PageContainer;
