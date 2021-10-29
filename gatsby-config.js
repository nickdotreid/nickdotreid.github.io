module.exports = {
  siteMetadata: {
    title: `Nick Reid`,
    description: `Nick Reid is a PhD Student in Biomedical and Health Informatics at the University of Washington in Seattle Washington`,
    author: `@nickreid`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/nickreid-favicon.png`
      },
    }
  ],
}
