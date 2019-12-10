import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@knotel/cinderblock'
import Collapsable from '../Collapsable/Collapsable'
import ListHeader from './ListHeader'
import CartListItem from './CartListItem'

const CartList = ({
  collapsableTitle,
  price,
  listHeaderTitle,
  items,
  itemsToUpgrade,
  onItemClick,
  onCheckboxClick,
  mt
}) => {
  return (
    <Collapsable title={collapsableTitle} subtitle={price} mt={mt}>
      <Box width={[1]} mb={4}>
        <ListHeader title={listHeaderTitle} />
        {items.map(i => (
          <CartListItem
            key={i.id}
            onItemClick={onItemClick}
            onCheckboxClick={onCheckboxClick}
            {...i}
          />
        ))}
      </Box>
    </Collapsable>
  )
}

CartList.propTypes = {
  onItemClick: PropTypes.func,
  collapsableTitle: PropTypes.string,
  listHeaderTitle: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.any,
  itemsToUpgrade: PropTypes.array,
  onCheckboxClick: PropTypes.func
}

export default CartList
