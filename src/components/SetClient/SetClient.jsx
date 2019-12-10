import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Flex, Button, Input, Text } from '@knotel/cinderblock'

const SetClientButton = styled(Button)`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  margin-left: auto;
  &:hover{
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`

class SetClient extends React.Component {
  constructor () {
    super()
    this.state = {
      clientName: '',
      clientAddress: '',
    }
  }

  handleChange = () => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <Flex flexDirection="row" mb={4} alignItems="center">
        <Box width={[ 3 / 9 ]}>
          <Flex flexDirection="row" alignItems="center">
            <Text color="gray" mr={3} fontSize={3}>Client</Text>
            <Input id="clientName"
              name="clientName"
              placeholder="Knotel"
              value={this.state.clientName}
              onChange={() => this.handleChange()}
              mr={4} />
          </Flex>
        </Box>
        <Box width={[ 5 / 9 ]} mr={4}>
          <Flex flexDirection="row" alignItems="center">
            <Text color="gray" mr={3} fontSize={3}>Address</Text>
            <Input id="clientAddress"
              name="clientAddress"
              placeholder="229 west 43rd street New York, NY 10036"
              value={this.state.clientAddress}
              onChange={() => this.handleChange()} />
          </Flex>
        </Box>
        <Box width={[ 1 / 9 ]}>
          <Flex flexDirection="row">
            <SetClientButton onClick={() => { this.props.onSet({ ...this.state }) }}>Set Client</SetClientButton>
          </Flex>
        </Box>
      </Flex>
    )
  }
}

SetClient.propTypes = {
  onSet: PropTypes.func
}

export default SetClient
