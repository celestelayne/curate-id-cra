import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, Card } from '@knotel/cinderblock'

const placeHolderShimmer = keyframes`
  0% {
    background-position: -284px 0;
  }
  100% {
    background-position: 284px 0;
  }
`

const LoadingCard = styled(Card)`
  border: none;
`

const LoaderBox = styled(Box)`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeHolderShimmer};
  animation-timing-function: linear;
  background: #f6f7f9;
  background-image: linear-gradient(to right, #f6f7f9 0%, #eaeef2 40%, #f6f7f9 100%);
  background-repeat: no-repeat;
  position: relative;
  width: 100%;
  height: 300px;
`

const Row = styled(LoaderBox)`
  height: 14px;
  width: 80%;
`

const LastRow = styled(Row)`
  height: 14px;
  width: 40%;
`

const PlaceCard = () => {
  return (
    <Box width={[1, 1 / 2, 1 / 3]}>
      <LoadingCard p={[1, 2]}>
        <LoaderBox className="loader" />
        <Row mt={2} />
        <Row mt={2} />
        <LastRow mt={2} />
      </LoadingCard>
    </Box>
  )
}

export default PlaceCard
