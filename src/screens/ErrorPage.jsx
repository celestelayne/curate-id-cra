import React, { Component } from 'react'
import { Container, Flex, Text } from '@knotel/cinderblock'

class ErrorPage extends Component {
  render () {
    return (
      <Container>
        <Flex>
          <Text>Your princess is in another castle. <span role="img" aria-label="Princess">👸</span></Text>
        </Flex>
      </Container>
    )
  }
}

export default ErrorPage
