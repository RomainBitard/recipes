import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'

import styles from './index.module.css'

import Layout from '../layout'

const Blog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const allPosts = edges
  const emptyQuery = ''

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    const query = event.target.value
    const posts = edges || []

    const filteredData = posts.filter(post => {
      const { excerpt, title, tags } = post.node.frontmatter
      return (
        excerpt.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags &&
          tags
            .join('')
            .toLowerCase()
            .includes(query.toLowerCase()))
      )
    })
    setState({ query, filteredData })
  }
  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  return (
    <Layout>
      <form>
        <input
          className={styles.input}
          onChange={handleInputChange}
          placeholder="Type here to filter recipes..."
        />
      </form>
      <div className={styles.actualContainer}>
        {posts.map(({ node: { frontmatter } }) => (
          <div key={frontmatter.path} className={styles.blogContainer}>
            <Link to={frontmatter.path} className={styles.linkContainer}>
              <div>
                <p className={styles.blogTitle}>{frontmatter.title}</p>{' '}
                <p className={styles.excerpt}>{frontmatter.excerpt}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              path: PropTypes.string,
              date: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }),
}

export default Blog

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
            excerpt
            tags
          }
        }
      }
    }
  }
`
