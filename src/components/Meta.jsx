import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const Meta = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`KitKatalog | ${title}`}</title>
    </Helmet>
  )
}

Meta.propTypes = {
  title: PropTypes.string
}

export default Meta
