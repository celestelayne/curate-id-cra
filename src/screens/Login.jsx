import React, { Component } from 'react'
import { Text } from '@knotel/cinderblock'
import { redirectToFoundationAuth } from '../services/auth'

class Login extends Component {
  componentDidMount () {
    // TODO: when redirecting to login, pass state to record where to redirect
    // user after login
    redirectToFoundationAuth()
  }

  render () {
    return (
      <Text>Redirecting to Google login...</Text>
    )
  }
}

export default Login
