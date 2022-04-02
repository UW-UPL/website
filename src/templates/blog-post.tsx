import * as React from "react";
import { Link as GLink, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { getImage } from "gatsby-plugin-image";
import { Giscus } from "@giscus/react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import PageContainer from "../components/page-container";
import Person from "../components/person";
import MDXComponents from "../components/mdx-components";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next, authorData, authorImage } = data;
  console.log(authorData, authorImage);
  const author = authorData.childPeopleYaml;
  const image = getImage(authorImage);

  return (
    <Layout location={location}>
      {/* <Layout location={location} title={siteTitle}> */}
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <PageContainer>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={GLink} to="/blog">
                Blog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/blog${post.fields.slug}`}>
                {post.frontmatter.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box as="header">
            <Heading as="h1" mb="4" fontSize="6xl" fontWeight="black">
              {post.frontmatter.title}
            </Heading>
            <HStack
              mb="14"
              spacing="1.5"
              divider={<StackDivider border="none">·</StackDivider>}
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="0.03em"
            >
              <Text position="relative">
                {author.name}
                <Box
                  position="absolute"
                  top="7"
                  w="100%"
                  h="3px"
                  bg="red.500"
                  borderRadius="full"
                />
              </Text>
              <Text>{post.frontmatter.date}</Text>
              <Text>{post.timeToRead} minute read</Text>
            </HStack>
          </Box>
          <Box maxW="4xl" fontSize="xl" lineHeight="1.5">
            <MDXProvider components={{ ...MDXComponents }}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
          </Box>
          <Divider mt="12" mb="12" />
          <Flex justifyContent="center">
            <Person person={{ image, data: author }} />
          </Flex>
        </article>
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <GLink to={"/blog" + previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </GLink>
              )}
            </li>
            <li>
              {next && (
                <GLink to={"/blog" + next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </GLink>
              )}
            </li>
          </ul>
        </nav>
        <Giscus
          repo="UW-UPL/website"
          repoId="R_kgDOG0Av5A"
          category="Comments"
          categoryId="DIC_kwDOG0Av5M4COKw-"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="light"
          lang="en"
        />
      </PageContainer>
    </Layout>
  );
};
export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $authorId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author
      }
      timeToRead
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    authorData: file(name: { eq: $authorId }, extension: { eq: "yml" }) {
      childPeopleYaml {
        id
        bio
        coord
        facultyadvisor
        github
        linkedin
        name
        study
        url
      }
    }
    authorImage: file(name: { eq: $authorId }, extension: { ne: "yml" }) {
      childImageSharp {
        gatsbyImageData(
          width: 200
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`;
