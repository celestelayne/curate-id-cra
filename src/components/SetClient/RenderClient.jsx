import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Box, CloseButton, Flex, Text } from '@knotel/cinderblock'
import * as projectActions from '../../actions/projectActions'

class RenderClient extends React.Component {
  render () {
    const { project, projectActions } = this.props
    return (
      <Flex flexDirection="row" mb={4} alignItems="center">
        <Box width={[ 1 / 3 ]}>
          <Flex flexDirection="row" alignItems="center">
            <Text color="gray" mr={3} fontSize={3}>Client</Text>
            <Text fontSize={3} mr={4}>{project.clientName}</Text>
          </Flex>
        </Box>
        <Box width={[ 2 / 3 ]}>
          <Flex flexDirection="row" alignItems="center">
            <Text color="gray" mr={3} fontSize={3}>Address</Text>
            <Text fontSize={3}>{project.clientAddress}</Text>
          </Flex>
        </Box>
        <CloseButton onClick={projectActions.removeSelectedProject} />
      </Flex>
    )
  }
}

RenderClient.propTypes = {
  projectActions: PropTypes.object,
  project: PropTypes.object,
}

function mapDispatchToProps (dispatch) {
  return {
    projectActions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(RenderClient)
