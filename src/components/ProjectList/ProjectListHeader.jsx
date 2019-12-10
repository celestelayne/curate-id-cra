import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text, Flex, Heading } from '@knotel/cinderblock'

import theme from '../../theme'
import { hexToRgb } from '../../util'
import SearchInput from '../SearchInput'
import ListSorter from './ListSorter'
import NewProjectModal from '../NewProjectModal'

const Header = styled(Flex)`
  height: ${props => props.theme.space[4]}px;
  background-color: ${props => `rgba(${hexToRgb(props.theme.colors.lightBlue)},0.25)`};
  align-items: center;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.darkPurple};
  padding-right: ${props => props.theme.space[2]}px;
  border-bottom: 1px solid ${theme.colors.borderGray};
`

const HeadWrapper = styled(Box)`
  border-bottom: 1px solid ${theme.colors.borderGray};
`

const SearchSection = styled(Flex)`
  align-items: center;
  border-bottom: 1px solid ${theme.colors.borderGray};
`

const StyledSearchInput = styled(SearchInput)`
  width: 100%;
  margin: 0;
  margin-right: ${theme.space[4]}px;
`

const ListHeader = ({ headers = [], title, onSearch, onAdd, setSortingCriterion }) => (
  <React.Fragment>
    <HeadWrapper>
      <Flex p={3} justifyContent="space-between">
        <Box my="auto">
          <Heading.h2 m={0} color={theme.colors.darkPurple} bold>
            {title}
          </Heading.h2>
        </Box>
        <Box>
          <NewProjectModal onSubmit={onAdd} />
        </Box>
      </Flex>
    </HeadWrapper>
    <SearchSection p={3}>
      <StyledSearchInput onChange={onSearch} />
      <ListSorter setSortingCriterion={setSortingCriterion} />
    </SearchSection>
    <Header p={2}>
      <Flex p={2} width={1}>
        {headers.map(header => (
          <Box key={header.value} width={[header.width]}>
            <Text fontSize={theme.fontSizes[0]} caps>
              {header.value}
            </Text>
          </Box>
        ))}
      </Flex>
    </Header>
  </React.Fragment>
)

ListHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  setSortingCriterion: PropTypes.func
}

export default ListHeader
