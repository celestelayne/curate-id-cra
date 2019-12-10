import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Absolute, Relative, Badge as CinderBadge, Box, Flex, Card, Image, Text, Truncate } from '@knotel/cinderblock'
import { InfoLabel } from '../Txt'
import { formatCurrency } from '../../util'
import noImg from './noimg.png'

import { trackProductCardClick } from '../../tracking'
const Badge = styled(CinderBadge)`
  border-radius: 2px;
`

const Ind = styled(Relative)`
  width: ${props => props.theme.space[2]}px;
  height: ${props => props.theme.space[2]}px;
  border-radius: 50%;
  top: 12px;
  left: -12px;
`

const ProductCardTitle = styled(Text)`
  font-size: ${props => props.theme.fontSizes[3]}px;
  text-overflow: ellipsis;
`

const ProductCardCategory = styled(InfoLabel)``

const ProductCardPrice = styled(InfoLabel)`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  text-align: right;
  font-size: ${props => props.theme.fontSizes[3]}px;
`

const HoverCard = styled(Card)`
  transition-duration: ${props => props.theme.duration.normal};
  &:hover {
    box-shadow: ${props => props.theme.boxShadows[0]};
  }
`

const ImageBox = styled(Box)`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #fff;
  transition-duration: ${props => props.theme.duration.normal};
  ${props => props.theme.mediaQueries['sm']} {
    flex-wrap: nowrap;
  }
`

const ProductFrame = styled(Flex)`
  height: 250px;
  align-items: center;
  vertical-align: middle;
`

const ProductImage = styled(Image)`
  object-fit: cover;
  flex-grow: 1;
  max-width: unset !important;
  max-height: 100%;
  height: auto;
  vertical-align: middle;
  transition-duration: ${props => props.theme.duration.normal};
  &:hover {
    transform: scale(1.05);
  }
`

const handleLinkClick = () => {
  window.scrollTo(0, 0)
}

const ProductCard = ({
  id, name, status,
  usTotalCost, ukTotal, brTotal,
  type, photoUrl, Photos,
  inWarehouse, category
}) => {
  photoUrl = Photos && Photos.length ? Photos[0].imgixUrl : photoUrl || noImg
  let statusColor = 'green'
  switch (status) {
    case 'NEW ADDITION':
      statusColor = 'blue'
      break
    case 'Active':
      statusColor = 'green'
      break
    case 'Work In Progress':
      statusColor = 'orange'
      break
    case 'Phasing Out':
      statusColor = 'red'
      break
    default:
      statusColor = 'green'
  }
  return (
    <Box onClick={() => trackProductCardClick(id)} width={[1, 1 / 2, 1 / 3]}>
      <HoverCard bg="white" m={2} borderWidth={1}>
        <Relative>
          <Link onClick={handleLinkClick} to={`/product/${id}`}>
            <ImageBox>
              <ProductFrame>
                <ProductImage alt={name} src={photoUrl} />
              </ProductFrame>
            </ImageBox>
            <Absolute top={8} left={8}>{ inWarehouse ? <Badge bg="darkBlue" color="white">In Warehouse</Badge> : null }</Absolute>
          </Link>
        </Relative>
        <Box p={[2, 3]}>
          <ProductCardCategory mt={1}>{ category }</ProductCardCategory>
          <ProductCardTitle mt={1}>
            <Truncate>{name}</Truncate>
          </ProductCardTitle>
          { status ? <Badge bg="white" color={statusColor}><Ind bg={statusColor} /> {status} </Badge> : <Badge bg="white"><Ind bg="white" /> &nbsp; </Badge> }
          <ProductCardPrice mt={1}>
            {type === 'F.US' && usTotalCost ? formatCurrency(usTotalCost, type) : <span>&nbsp;</span>}
            {type === 'F.EU' && ukTotal ? formatCurrency(ukTotal, type) : <span>&nbsp;</span>}
            {type === 'F.BR' && brTotal ? formatCurrency(brTotal, type) : <span>&nbsp;</span>}
          </ProductCardPrice>
        </Box>
      </HoverCard>
    </Box>
  )
}

ProductCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  photoUrl: PropTypes.string,
  Photos: PropTypes.array,
  usTotalCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ukTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  brTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  category: PropTypes.string,
  inWarehouse: PropTypes.bool,
  status: PropTypes.string,
}

ProductCard.displayName = 'ProductCard'

export default ProductCard
