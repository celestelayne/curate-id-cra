import jwtDecode from 'jwt-decode'
import history from '../history'

import envConfig from '../env'

const { REACT_APP_FOUNDATION_BASE_URL } = envConfig

function exchangeAccessToken () {
  return new Promise((resolve, reject) => {
    // Should only be called from the Callback component which should only
    // render on path /cb?singleUseToken=<AccessCode>
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('singleUseToken')

    if (!token) {
      // If no access code in path, auth fails
      history.push('/login')
      reject(new Error('No single use access token in URL. Redirecting to Login'))
    } else {
      // If access code present, exchange for authorization token
      fetch(REACT_APP_FOUNDATION_BASE_URL + `/account/token_exchange/${token}`)
        .then(res => res.json())
        .then(res => {
          if (res.message === 'Expired single use token.') {
            redirectToFoundationAuth()
          } else {
            localStorage.setItem('knotel_token', res.jwt)
            resolve(res.jwt)
          }
        })
        .catch(reject)
    }
  })
}

function currentUser () {
  const token = localStorage.getItem('knotel_token')
  if (token !== 'undefined' && token) {
    const user = jwtDecode(token)
    return user
  }
  localStorage.removeItem('knotel_token')
  exchangeAccessToken()
  return null // no token, no user
}

function redirectToFoundationAuth () {
  const callbackUrl = window.location.origin + '/cb'
  window.location.href = `${REACT_APP_FOUNDATION_BASE_URL}/account/google/login?callbackUrl=${callbackUrl}&grantType=auth_code`
}

export {
  currentUser,
  exchangeAccessToken,
  redirectToFoundationAuth,
}
