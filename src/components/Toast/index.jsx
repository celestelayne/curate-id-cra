import React from 'react'

import DoneIcon from '../../assets/done.svg'

import { Container, Row, Title, Icon, Description } from './components'

export class Toast extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      config: null
    }
  }

  showMessage = (config = { title: '', description: '' }, duration = 5 * 1000) => {
    this.setState({
      config,
      open: true,
    }, () => {
      setTimeout(() => {
        this.hideMessage()
      }, duration)
    })
  }

  hideMessage = () => {
    this.setState({ open: false })
  }

  render () {
    const { open, config } = this.state
    return (
      <Container open={open}>
        <Row>
          <Icon src={DoneIcon} />
          <Title>{config ? config.title : ''}</Title>
        </Row>
        {config && config.description ? (
          <Row>
            <Description>{config.description}</Description>
          </Row>
        ) : null}
      </Container>
    )
  }
}

Toast.propTypes = {}

Toast.defaultProps = {}

export default Toast
