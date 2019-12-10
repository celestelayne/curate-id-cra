import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect
} from 'react-router-dom'

import { currentUser } from '../services/auth'

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        const user = currentUser()
        if (!user) {
          return (
            <Redirect to="/login" />
          )
        }
        return <Component user={user} {...props} />
      }} />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func
}

PrivateRoute.displayName = 'PrivateRoute'

export default PrivateRoute
