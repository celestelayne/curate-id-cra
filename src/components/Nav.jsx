import React from 'react'
import PropTypes from 'prop-types'
import Popover from 'react-tiny-popover'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled, { css } from 'styled-components'
import { Avatar, Box, Flex, Text, Icon } from '@knotel/cinderblock'
import KnotelLogo from './KnotelLogo'
import CartIcon from '../assets/cart.svg'
import CartActiveIcon from '../assets/cart_active.svg'
import CartDisabledIcon from '../assets/cart_disabled.svg'

import { CART_ITEMS_COUNT } from '../queries'
import { trackHomepageLogoClick } from '../tracking'
import { extractConfigByHash } from '../util'
import theme from '../theme'

const navLinks = {
  products: link => link.includes('products'),
  projects: link => link.includes('projects') || link === '/',
  cart: link => link.includes('cart')
}

const navItemStyles = css`
  text-decoration: none;
  text-transform: uppercase;
  font-family: ${props => props.theme.font};
  margin-left: ${props => props.theme.space[3]}px;
  padding: 0 ${props => props.theme.space[3]}px;
  align-items: center;
  text-transform: capitalize;
  display: none;
  ${props => props.theme.mediaQueries['md']} {
    display: flex;
  }
  ${props =>
    props.active
      ? `
    border-bottom: ${theme.space[1]}px solid ${theme.colors.lynch};
    div {
      color: ${theme.colors.lynch};
    }
    `
      : `
    div {
      color: ${theme.colors.semiGray};
    }
    padding-bottom: ${theme.space[1]}px;
  `}
`

const AvatarContainer = styled(Flex)``

const StyledAvatar = styled(Avatar)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AppBar = styled(Flex)`
  position: fixed;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
  z-index: 1000;
`

const NavItem = styled(NavLink)`
  ${navItemStyles}
`

const NavPopover = styled(Box)`
  cursor: pointer;
  ${navItemStyles}
`

const LinkLabel = styled(Text)`
  font-family: ${props => props.theme.font};
  font-size: ${props => props.theme.fontSizes[2]}px;
  font-weight: 600;
  ${props =>
    props.disabled
      ? `
    color: #E0E0E0 !important;
  `
      : `
    color: ${props => props.theme.colors.primary};
  `}
`

const IconWrapper = styled(Box)`
  height: 24px;
  width: 24px;
  margin-right: ${props => props.theme.space[2]}px;
`

const StyledCartIcon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const PopoverBackground = styled(Box)`
  background-color: white;
`

const PopoverItem = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: 14px;
  line-height: 17px;
  padding: 16px;
  width: 180px;
  color: ${theme.colors.text};
  transition: background-color 0.2s ease;
  :hover {
    background-color: #f5f5f5;
  }
`

const Item = styled(Text)`
  display: block;
  text-decoration: none;
  font-size: 14px;
  line-height: 17px;
  padding: 16px;
  width: 180px;
  color: ${theme.colors.text};
  transition: background-color 0.2s ease;
  :hover {
    background-color: #f5f5f5;
  }
`

const DisabledItem = styled(Flex)`
  pointer-events: none;
`

const PopoverContent = ({ handleClose }) => (
  <PopoverBackground onClick={handleClose}>
    <PopoverItem to="/projects#my">My projects</PopoverItem>
    <PopoverItem to="/projects">All projects</PopoverItem>
    <PopoverItem to="/projects#archived">Archived projects</PopoverItem>
  </PopoverBackground>
)

PopoverContent.propTypes = {
  handleClose: PropTypes.func
}

const handleRefresh = () => {
  window.location.reload()
}

const handleLogout = () => {
  const LOCAL_STORAGE = {
    knotelToken: 'knotel_token'
  }
  localStorage.removeItem(LOCAL_STORAGE.knotelToken)
  localStorage.removeItem('demand_profile')
  window.location.href = '/'
}

const AvatarContent = ({ handleClose }) => (
  <PopoverBackground onClick={handleClose}>
    <Item onClick={handleRefresh}>Refresh</Item>
    <Item onClick={handleLogout}>Logout</Item>
  </PopoverBackground>
)

AvatarContent.propTypes = {
  handleClose: PropTypes.func
}

const containerStyle = {
  zIndex: 1001,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.16), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 0px 0px #d1d6db'
}

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPopoverOpen: false,
      isLogoutOpen: false
    }
  }

  handlePopoverTransition = () => {
    this.setState(state => ({
      isPopoverOpen: !state.isPopoverOpen
    }))
  }

  handlePopoverClose = () => {
    this.setState({
      isPopoverOpen: false
    })
  }

  handleLogoutTransition = () => {
    this.setState(state => ({
      isLogoutOpen: !state.isLogoutOpen
    }))
  }

  handleLogoutClose = () => {
    this.setState({
      isLogoutOpen: false
    })
  }

  render () {
    const {
      selectedProjectExist,
      history: {
        location: { pathname, hash }
      }
    } = this.props
    const { isPopoverOpen, isLogoutOpen } = this.state
    const config = extractConfigByHash(hash)

    return (
      <AppBar color="text" bg="white" px={2}>
        <Flex alignItems={'center'} ml={2}>
          <NavLink onClick={() => trackHomepageLogoClick()} to="/">
            <KnotelLogo height="16" width="90" />
          </NavLink>
        </Flex>
        <Box ml="auto" mr={2}>
          <Flex>
            <NavPopover active={navLinks.projects(pathname)}>
              <Popover
                padding={28}
                transitionDuration={0.15}
                onClickOutside={this.handlePopoverClose}
                containerStyle={containerStyle}
                position={'bottom'}
                isOpen={isPopoverOpen}
                content={props => <PopoverContent {...props} handleClose={this.handlePopoverClose} />}
              >
                <LinkLabel onClick={this.handlePopoverTransition}>{config.title}</LinkLabel>
              </Popover>
            </NavPopover>
            <NavItem to="/products" active={navLinks.products(pathname)}>
              <LinkLabel>Products</LinkLabel>
            </NavItem>
            {selectedProjectExist ? (
              <NavItem to="/cart" active={navLinks.cart(pathname)}>
                <IconWrapper>
                  <StyledCartIcon src={navLinks.cart(pathname) ? CartActiveIcon : CartIcon} />
                </IconWrapper>
                <Query query={CART_ITEMS_COUNT}>
                  {({ data }) => <LinkLabel>{`Cart (${data.cartItemsCount && data.cartItemsCount.count})`}</LinkLabel>}
                </Query>
              </NavItem>
            ) : (
              <DisabledItem>
                <NavItem to="">
                  <IconWrapper>
                    <StyledCartIcon src={CartDisabledIcon} />
                  </IconWrapper>
                  <LinkLabel disabled>Cart</LinkLabel>
                </NavItem>
              </DisabledItem>
            )}

            <NavPopover>
              <Popover
                padding={28}
                transitionDuration={0.15}
                onClickOutside={this.handleLogoutClose}
                containerStyle={containerStyle}
                position={'bottom'}
                isOpen={isLogoutOpen}
                content={props => <AvatarContent {...props} handleClose={this.handleLogoutClose} />}
              >
                {/* <LinkLabel onClick={this.handlePopoverTransition}>{config.title}</LinkLabel> */}
                <AvatarContainer
                  onClick={this.handleLogoutTransition}
                  justifyContent="center"
                  alignItems="center"
                  mx={3}
                  my={2}
                >
                  <StyledAvatar width="40px" height="40px">
                    <Icon color="lightGrey" size={32} name="User" />
                  </StyledAvatar>
                </AvatarContainer>
              </Popover>
            </NavPopover>
          </Flex>
        </Box>
      </AppBar>
    )
  }
}

function mapStateToProps (state) {
  return {
    selectedProjectExist: Boolean(state.projects.selectedProject)
  }
}

Nav.propTypes = {
  history: PropTypes.object,
  selectedProjectExist: PropTypes.bool
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Nav)
