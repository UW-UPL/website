import * as React from "react";
import { graphql } from "gatsby";
import { Heading, Text } from "@chakra-ui/react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import BlogPostCard, { IPost } from "../components/blog-post-card";
import PageContainer from "../components/page-container";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts: IPost[] = data.allMdx.nodes.map((node) => ({
    ...node,
    frontmatter: {
      ...node.frontmatter,
      date: new Date(parseInt(node.frontmatter.date)),
    },
  }));

  return (
    <Layout location={location}>
      <Seo title="All posts" />

      <PageContainer>
        <Heading textAlign="center" mb="7">
          Blog
        </Heading>
        <Text
          w="xl"
          textAlign="center"
          ml="auto"
          mr="auto"
          mb="14"
          fontSize="lg"
        >
          Various ramblings from coords and other friends. Learn something new
          about technology, and maybe even yourself.
        </Text>

        {posts.map((post) => {
          return <BlogPostCard key={post.fields.slug} post={post} />;
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
