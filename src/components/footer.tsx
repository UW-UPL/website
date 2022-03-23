import * as React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Flex as="footer" justify="center" p={6}>
      <Text>upl@cs.wisc.edu</Text>
    </Flex>
  );
};

export default Footer;
