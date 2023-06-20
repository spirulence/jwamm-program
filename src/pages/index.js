import * as React from "react"
import { graphql } from "gatsby"

import { DateTime } from "luxon";

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({data}) => (
  <Layout>
    <div className={styles.textCenter}>
      <h1>
        Welcome to <b>JWAMM!</b>
      </h1>
      <p className={styles.intro}>
        JWAMM is <b>June Weekend Academy of Music Month</b>. 
        <br></br>We host an online-only collective upleveling event in June (and January) to practice and improve our rapid music creation skills. 
      </p>
      <p className={styles.intro}>
        <b>Our next event is June 24, 2023</b>. Everyone is welcome! Here's what's currently planned.
      </p>
      <p>Times listed in {DateTime.local().zoneName} timezone.</p>
      {data.allEvents.nodes.map((node) => (
        <p className={styles.calendarEntry}>
          {DateTime.fromISO(node.start_time, { zone: "utc" }).toLocal().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} - {node.duration_minutes} minutes <br></br>
          {node.title} <br></br>
          Host: <b>{node.host}</b> <br></br>
          {node.description} <br></br>
          <a href={node.location}>{node.location}</a> <br></br>
          Password: <b>{node.password}</b>
        </p>
      ))}
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const query = graphql`
  query HomePageQuery {
    allEvents(sort: { start_time: ASC  } ) {
      nodes {
        title
        host
        description
        start_time
        location
        duration_minutes
      }
    }
  }
`

export default IndexPage
