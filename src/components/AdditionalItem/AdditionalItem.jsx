import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Flex, Button } from '@knotel/cinderblock'
import Modal, { ModalContent } from '../BaseModal'
import AdditionalItemForm from '../../forms/AdditionalItemForm'

const AddItem = styled(Button)`
  height: 45px;
  white-space: nowrap;
`

class AdditionalItem extends React.Component {
  state = {
    photoUrl: '',
    name: '',
    usd: 0,
    usTotalCost: 0,
    quantity: 1,
    visible: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleModalClose = () => {
    this.setState({ visible: false })
  }

  handleModalOpen = () => {
    this.setState({ visible: true })
  }

  handleSubmit = (values, actions) => {
    this.props.onAdd({
      name: values.name,
      vendor: values.vendor,
      color: values.color,
      link: values.hyperlink,
      dimensions: values.dimensions,
      usTotalCost: (Number.parseFloat(values.price.substr(1))).toFixed(2),
      quantity: Number(values.quantity)
    })
    this.handleModalClose()
  }

  render () {
    return (
      <Flex alignItems="center">
        <Box>
          <AddItem onClick={this.handleModalOpen}>{this.props.label}</AddItem>
          <Modal onClose={this.handleModalClose} open={this.state.visible}>
            <ModalContent>
              <AdditionalItemForm onSubmit={this.handleSubmit} onClose={this.handleModalClose} />
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    )
  }
}

AdditionalItem.propTypes = {
  onAdd: PropTypes.func,
  label: PropTypes.string
}

AdditionalItem.defaultProps = {
  label: 'Add Additional Items'
}

export default AdditionalItem
