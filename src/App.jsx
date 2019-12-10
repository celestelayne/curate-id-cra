import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { persistCache } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-boost'
import localForage from 'localforage'

import { hot } from 'react-hot-loader'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Box } from '@knotel/cinderblock'
import theme from './theme'

import createClient from './ApolloClient'
import { currentUser } from './services/auth'
import PrivateRoute from './screens/PrivateRoute'
import Callback from './screens/Callback'
import Login from './screens/Login'

import store from './store/configureStore'
import Nav from './components/Nav'
import ProjectInfo from './components/ProjectInfo'
import ErrorPage from './screens/ErrorPage'
import ProductDetailScreen from './screens/ProductDetailScreen'
import ProductListingScreen from './screens/ProductListingScreen'

import ProjectDetailScreen from './screens/ProjectDetailScreen'
import ProjectListingScreen from './screens/ProjectListingScreen'

import CartScreen from './screens/CartScreen'
import ToastService from './services/toast'
import Toast from './components/Toast'

// import { trackUserDomainInfo } from './tracking'
// import { getClientId } from './services/analytics'

const FIXED_ELEMENTS_SIZES = {
  // here is the list of elements fixed on the top of page
  header: 57,
  projectInfoBar: 104,
  spacingPadding: 32
}

const REDUCED_PADDING_ROUTES = {
  // here is the list of places, where padding should be removed due to non present elements
  '/projects': FIXED_ELEMENTS_SIZES.projectInfoBar
}

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    /* overflow: hidden; */
    font-family: ${props => props.theme.font};
    margin: 0;
    padding: 0;
  }

  .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 400ms ease-in;
  }
`
const FullBox = styled(Box)`
  height: 100%;
  width: 100%;
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const calculatePadding = props =>
  REDUCED_PADDING_ROUTES[props.location.pathname]
    ? Object.values(FIXED_ELEMENTS_SIZES).reduce((acc, value) => (acc += value)) -
      REDUCED_PADDING_ROUTES[props.location.pathname]
    : Object.values(FIXED_ELEMENTS_SIZES).reduce((acc, value) => (acc += value))

// padding top should be greater or equal AppBar height
const ContentWrapper = withRouter(styled(Box)`
  height: 100%;
  margin: 0 auto;
  width: 100%;
  padding-top: ${props => calculatePadding(props)}px;
`)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { client: null }
  }

  componentDidMount () {
    // trackUserDomainInfo(getClientId())
    const cache = new InMemoryCache()
    persistCache({
      cache,
      storage: localForage
    }).then(() => this.setState({ client: createClient(cache) }))
  }

  render () {
    const user = currentUser() || ''
    console.log('User:', user)
    console.log('theme:', theme)
    console.log('store:', store)
    if (!this.state.client) return 'Loading...' /* proper loader should be here */
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={this.state.client}>
            <GlobalStyle />
            <Router>
              <Route
                render={({ location }) => (
                  <FullBox>
                    <>
                      <ProjectInfo />
                      <Nav />
                      <TransitionGroup>
                        {/* no different than other usage of
                              CSSTransition, just make sure to pass
                              `location` to `Switch` so it can match
                              the old location as it animates out
                          */}
                        <CSSTransition key={location.key} classNames="fade" timeout={250}>
                          <ContentWrapper py={3}>
                            <Switch>
                              <Route path="/cb" component={Callback} />
                              <Route path="/login" component={Login} />
                              <Route path="/error/:id" component={ErrorPage} />

                              <PrivateRoute path="/product/:id" component={ProductDetailScreen} />
                              <PrivateRoute path="/products" component={ProductListingScreen} />

                              <PrivateRoute path="/project/:id" component={ProjectDetailScreen} />
                              <PrivateRoute path="/projects" component={ProjectListingScreen} />

                              <PrivateRoute exact path="/cart" component={CartScreen} />
                              <PrivateRoute exact path="/" component={ProjectListingScreen} />

                              <Route component={ErrorPage} />
                            </Switch>
                          </ContentWrapper>
                        </CSSTransition>
                      </TransitionGroup>
                      <Toast ref={ToastService.init} />
                    </>
                  </FullBox>
                )}
              />
            </Router>
          </ApolloProvider>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default hot(module)(App)
