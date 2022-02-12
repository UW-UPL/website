import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

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

  console.log(rows);

  return (
    <Layout location={location} title={siteTitle}>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr>
              {r.map(e => <td>{e}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

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

