import React from 'react'
import Layout from '../layout'
import { Link } from 'gatsby'

const NotFound = () => (
  <Layout>
    Oops! Page not found. Looking for <Link to="/">recipes</Link>?
  </Layout>
)

export default NotFound
