module.exports = {
  siteMetadata: {
    title: `Undergraduate Projects Lab`,
    siteUrl: `https://www.upl.cs.wisc.edu`,
    description: `The UPL is a space for students with an interest in computer science to meet each other, work on projects together, and participate in events. `,
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-transformer-yaml`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/people`,
        name: `people`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content`,
        name: `data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
        extensions: [".md", ".mdx"],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + "/blog" + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + "/blog" + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
  ],
};