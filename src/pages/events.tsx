import * as React from "react";
import { Link, graphql } from "gatsby";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import Seo from "../components/seo";

dayjs.extend(advancedFormat);

const EventsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const events = data.allEventsYaml.nodes;
  const index = events.findIndex((event) =>
    dayjs(event.date).isBefore(dayjs())
  );

  const renderEventList = (events) => {
    return (
      <ol style={{ listStyle: `none` }}>
        {events.map((event) => (
          <li key={event.title + event.date}>
            <h3>{event.title}</h3>
            <h4>{dayjs(event.date).format("dddd, MMMM Do YYYY, h:mm A")}</h4>
            <h4>{event.location}</h4>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </li>
        ))}
      </ol>
    );
  };

  return (
    <Layout location={location}>
      {index > 0 && (
        <>
          <h2>Upcoming Events</h2>
          {renderEventList(events.slice(0, index))}
        </>
      )}
      <h2>Previous Events</h2>
      {renderEventList(events.slice(index))}
    </Layout>
  );
};

export default EventsIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allEventsYaml(sort: { order: DESC, fields: date }) {
      nodes {
        title
        location
        description
        date
      }
    }
  }
`;
