import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Divider,
  Heading,
} from "@chakra-ui/react";

const HoursIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const days = data.allHoursYaml.nodes;

  const rows = [];

  for (const time of days[0].times) {
    rows.push([time.time]);
  }

  for (const day of days) {
    for (let i = 0; i < day.times.length; i++) {
      rows[i].push(day.times[i].coord);
    }
  }

  let headers = [
    "Time",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <Layout location={location}>
      <Heading textAlign="center" as="h1" mb="7">
        Hours
      </Heading>
      <Text w="60%" textAlign="left" ml="auto" mr="auto" mb="8" fontSize="lg">
        Anyone is welcome in the UPL room whenever a coord is present, and
        coords commit to be present at certain office hours. All you need to do
        is come in and say hi!{" "}
      </Text>
      <Divider mb="4" w="60%" ml="auto" mr="auto" />
      <TableContainer w="65%" mr="auto" ml="auto" borderRadius="md">
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              {headers.map((e) => (
                <Th bgColor="gray.100" color="gray.700" fontSize="md">
                  {e}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {headers.map(() => (
                <Td> </Td>
              ))}
            </Tr>
            {rows.map((r) => (
              <Tr>
                {r.map((e, index) => {
                  return index === 0 ? (
                    <Td fontSize="lg" color="gray.700" bg="gray.50" pt="4">
                      <Text mt="-9">{e}</Text>
                    </Td>
                  ) : (
                    <Td fontSize="lg" color="gray.700" bg="gray.50" pt="4">
                      {e}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default HoursIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allHoursYaml {
      nodes {
        day
        times {
          time
          coord
        }
      }
    }
  }
`;
