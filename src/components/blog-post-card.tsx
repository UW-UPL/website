// import * as React from "react";
// import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
// import { displayDate } from "../common/display-date";

// export interface IPost {
//   fields: {
//     slug: string;
//   };
//   frontmatter: {
//     date: Date;
//     description: string;
//     title: string;
//   };
//   timeToRead: number;
// }

// interface BlogPostCardProps {
//   post: IPost;
// }

// const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
//   return (
//     <LinkBox mb="12" p="8" bg="red.50" borderRadius="lg" boxShadow="xl">
//       <Heading></Heading>
//       <LinkOverlay href={"/blog" + post.fields.slug}>
//         <Heading mb="1">{post.frontmatter.title}</Heading>
//       </LinkOverlay>
//       <Text mb="2" fontWeight="medium">
//         {displayDate(post.frontmatter.date)} · {post.timeToRead} minute read
//       </Text>
//       <Text>{post.frontmatter.description}</Text>
//     </LinkBox>
//   );
// };

// export default BlogPostCard;
