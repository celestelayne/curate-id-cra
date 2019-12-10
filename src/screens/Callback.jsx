import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Text } from '@knotel/cinderblock'

// import { exchangeAccessToken } from '../services/auth'

// Borrows heavily from https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/
class Callback extends Component {
  componentDidMount () {
    try {
      // causing a loop
      // await exchangeAccessToken()
      this.props.history.replace('/projects#my')
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (
      <Text>Authenticating...</Text>
    )
  }
}

Callback.propTypes = {
  history: PropTypes.object
}

Callback.displayName = 'Callback'

export default withRouter(Callback)
