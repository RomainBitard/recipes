import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import styles from './Header.module.css'

import Container from '../Container'

const Header = ({ title }) => (
  <header className={styles.Header}>
    <Container>
      <Link to="/">
        <h3 className={styles.title}>{title}</h3>
      </Link>
    </Container>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
