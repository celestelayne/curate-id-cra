import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Flex } from '@knotel/cinderblock'
import Meta from '../components/Meta'
import ProjectList from '../components/ProjectList/ProjectList'
import { extractConfigByHash } from '../util'

class ProjectListingScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      projectCount: 0,
    }
  }

  render () {
    const { location: { hash } } = this.props
    const config = extractConfigByHash(hash)
    return (
      <Container>
        <Meta title="Projects" />
        <Flex px={4}>
          <Box width={1}>
            <ProjectList
              title={config.title}
              selectedProjectType={config.listName}
            />
          </Box>
        </Flex>
      </Container>
    )
  }
}

ProjectListingScreen.propTypes = {
  location: PropTypes.object,
}

export default ProjectListingScreen
