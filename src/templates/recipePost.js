import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import styes from './recipePost.module.css'

import Layout from '../layout'

const BlogTemplate = ({ data }) => {
  const { markdownRemark } = data
  const title = markdownRemark.frontmatter.title
  const date = markdownRemark.frontmatter.date
  const html = markdownRemark.html

  return (
    <Layout>
      <h1>{title}</h1>
      <p>
        <i>{date}</i>
      </p>
      <div
        className={styes.blogPost}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <p></p>
    </Layout>
  )
}

const pageContextProps = PropTypes.shape({
  path: PropTypes.string,
  title: PropTypes.string,
})

BlogTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
      }),
    }),
  }),
  pageContext: PropTypes.shape({
    next: pageContextProps,
    prev: pageContextProps,
  }),
}

export default BlogTemplate

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
