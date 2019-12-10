import styled from 'styled-components'
import { Box, Flex, Image } from '@knotel/cinderblock'

export const CropBox = styled(Box)``

export const PhotosContainer = styled(Flex)`
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: content-box;
  margin-top: 10px;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  img {
    cursor: pointer;
    height: 64px;
    width: 84px;
    margin: 0;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`

export const Content = styled(Flex)`
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  ${props => props.theme.mediaQueries['sm']} {
    max-width: 460px;
  }
`

export const CropImage = styled(Image)`
  width: 100%;
  object-fit: contain;
  border-radius: 4px;
`
