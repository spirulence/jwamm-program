/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `JWAMM`,
    description: `Collectively uplevel your rapid music creation skills with online events in January and June.`,
    author: `Cameron Seebach`,
    siteUrl: `https://jwamm.com`,
  },
  plugins: [
    {
      resolve: "@davidrouyer/gatsby-source-custom-api",
      options: {
        url: {
          development: process.env.JWAMM_PROGRAM_API, // on "gatsby develop"
          production: process.env.JWAMM_PROGRAM_API // on "gatsby build"
        },
        schemas: {
          events: `
                  event_id: String
                  title: String
                  host: String
                  description: String
                  start_time: String
                  duration_minutes: Int
                  location: String
              `
        }
      }
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
