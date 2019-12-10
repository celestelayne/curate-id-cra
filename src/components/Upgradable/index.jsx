import React from 'react'
import styled from 'styled-components'
import { BlockLink, Card, Text } from '@knotel/cinderblock'
import { version } from '../../../package.json'
import ConfirmationModal from '../ConfirmationModal'
import semver from 'semver'

const Fixed = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
`

export class Upgradable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      msg: ''
    }
  }

  handleOpenUpgradeModal = () => {
    this.setState({ open: true })
  }

  handleCloseUpgradeModal = success => () => {
    if (success) {
      this.clearLocalStorage()
    }
    this.setState({ open: false })
  }

  clearLocalStorage = async () => {
    await localStorage.removeItem('kitKatCart')
    window.location.reload()
  }

  componentDidMount () {
    const up = semver.gt('0.50.0', version)
    this.setState({
      up,
      msg: up ? 'You are outdated.' : 'Upgrade Available.'
    })
  }

  render () {
    const { open, msg, up } = this.state
    return (
      <>
        <Fixed>
          <Card p={2} >
            <Text>v{ version } - { msg }</Text>
            { !up ? <BlockLink onClick={() => this.handleOpenUpgradeModal()}>Upgrade</BlockLink> : null }
          </Card>
        </Fixed>
        <ConfirmationModal
          secondary
          open={open}
          onClose={this.handleCloseUpgradeModal(false)}
          onConfirm={this.handleCloseUpgradeModal(true)}
          actionLabel="Upgrade"
          title="Upgrade Catalog"
          subTitle="Are you sure? This will clear your current cart and projects."
        />
      </>
    )
  }
}

Upgradable.propTypes = {}

Upgradable.defaultProps = {}

export default Upgradable
