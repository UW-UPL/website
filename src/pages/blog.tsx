import * as React from "react";
import { graphql } from "gatsby";
import { Heading, Text } from "@chakra-ui/react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import BlogPostCard, { IPost } from "../components/blog-post-card";
import PageContainer from "../components/page-container";
import { displayMonth } from "../common/display-date";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts: IPost[] = data.allMdx.nodes.map((node) => ({
    ...node,
    frontmatter: {
      ...node.frontmatter,
      date: new Date(parseInt(node.frontmatter.date)),
    },
  }));

  let previousDate: Date | null = null;
  return (
    <Layout location={location}>
      <Seo title="All posts" />

      <PageContainer>
        <Heading as="h1" textAlign="center" mb="7">
          Blog
        </Heading>
        <Text
          w="xl"
          textAlign="center"
          ml="auto"
          mr="auto"
          mb="-8"
          fontSize="lg"
        >
          Various ramblings from coords and other friends. Learn something new
          about technology, and maybe even yourself.
        </Text>

        {posts.map((post) => {
          const previousMonth = previousDate?.getUTCMonth();
          const previousYear = previousDate?.getUTCFullYear();
          const currentMonth = post.frontmatter.date.getUTCMonth();
          const currentYear = post.frontmatter.date.getUTCFullYear();
          let monthLabel = null;
          if (currentMonth !== previousMonth || currentYear !== previousYear) {
            monthLabel = (
              <Heading mt="32" mb="12" ml="8" color="gray.500">
                {displayMonth(post.frontmatter.date)}
              </Heading>
            );
          }
          previousDate = post.frontmatter.date;
          return (
            <React.Fragment key={post.fields.slug}>
              {monthLabel}
              <BlogPostCard post={post} />
            </React.Fragment>
          );
        })}
      </PageContainer>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "x")
          title
          description
        }
        timeToRead
      }
    }
  }
`;
