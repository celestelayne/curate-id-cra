import * as React from 'react'
import PropTypes from 'prop-types'

import { width } from 'styled-system'
import styled from 'styled-components'
import { Box, Button, Container, Flex, Text } from '@knotel/cinderblock'
import { Mutation, Query } from 'react-apollo'
import { CART_ITEMS_QUERY, CART_ITEMS_COUNT, CART_ITEMS_TOTAL_SUM } from '../queries'

import { connect } from 'react-redux'
import ToastService from '../services/toast'

// import AdditionalItem from '../components/AdditionalItem/AdditionalItem'
import Meta from '../components/Meta'
import BudgetBar from '../components/BudgetBar'
import CartList from '../components/CartList/CartList'
import ExportToSheetsButton from '../components/ExportToSheetsButton/ExportToSheetsButton'
import Modal, { ModalContent } from '../components/BaseModal'
import AdditionalItemForm from '../forms/AdditionalItemForm'
import ConfirmationModal from '../components/ConfirmationModal'
import { EDIT_CART_ITEM_MUTATION, EMPTY_CART_MUTATION } from '../mutations'

import { formatCurrency, hexToRgb, calculateBaselineBudget, calculateAllowance, calculateBudgetUpgrades } from '../util'
import { getTierByFoundationValue } from '../components/dataMappers.js'

import theme from '../theme'

import { trackProductCartView } from '../tracking'

const EmptyCart = styled(Button)`
  padding: ${props => props.theme.space[3]}px;
  color: ${props => props.theme.colors.primary};
  margin-top: ${props => props.theme.space[4]}px;
  padding-right: 0px;
  outline: none;
  float: right;
  text-align: right;
`

const Holder = styled(Container)`
  margin-top: ${props => props.theme.space[4]}px;
  padding: 0 ${props => props.theme.space[3]}px;
  ${props => props.theme.mediaQueries['md']} {
    padding: 0;
  }
`

const ColumnHeader = styled(Text)`
  ${width}
  color: ${props => props.theme.colors.darkPurple};
  font-weight: 600;
  text-transform: uppercase;
`

const TableHeader = styled(Flex)`
  border-top: 1px solid #cfd8dc;
  border-bottom: 1px solid #cfd8dc;
  height: ${props => props.theme.space[4]}px;
  align-items: center;
  background-color: ${props => `rgba(${hexToRgb(props.theme.colors.lightBlue)},0.25)`};
`

const LabelContainer = styled(Flex)`
  ${props => props.additionalStyles};
`

const TotalWrapper = styled(Flex)`
  border: 1px solid #cfd8dc;
`

const TableItem = styled(Flex)`
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.borderGray};
  }
`

class CartScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      idToEdit: null,
      isEditModalVisible: false,
      isEmptyModalVisible: false,
      initialValues: {}
    }
  }

  componentDidMount () {
    trackProductCartView()
  }

  handleOpenEmptyModal = () => {
    this.setState({ isEmptyModalVisible: true })
  }

  handleCloseEmptyModal = (isSuccess, emptyCart) => () => {
    if (isSuccess) {
      emptyCart()
      ToastService.showMessage('Cart Emptied', `You have removed all items from your cart.`)
    }
    this.setState({ isEmptyModalVisible: false })
  }

  handleModalClose = () => {
    this.setState({
      idToEdit: null,
      isEditModalVisible: false
    })
  }

  handleModalOpen = id => {
    const product = this.props.products.find(value => value.id === id)
    const initialValues = {
      hyperlink: product.link,
      price: product.usTotalCost / 100, // Conversion
      ...product
    }
    this.setState({
      idToEdit: id,
      isEditModalVisible: true,
      initialValues: initialValues
    })
  }

  handleEdit = (values, editCartItem) => {
    const item = {
      id: this.state.idToEdit,
      name: values.name,
      vendor: values.vendor,
      color: values.color,
      dimensions: values.dimensions,
      link: values.hyperlink,
      usTotalCost: Number.parseFloat(values.price.substr(1)) * 100,
      quantity: Number(values.quantity),
      type: 'Off-Platform Items',
      productTotalCost: Number.parseFloat(values.price.substr(1)) * Number(values.quantity)
    }
    editCartItem({ variables: { ...item } })
    ToastService.showMessage('Product added', `You have successfully edited ${item.name}.`)
    this.handleModalClose()
  }

  handleCheckboxClick = (id, isSelected, products, editCartItem) => {
    const product = products.find(value => value.id === id)
    editCartItem({ variables: { ...product, isUpgrade: isSelected } })
  }

  totalItems = items => {
    return items.filter(item => item.productTotalCost).reduce((a, b) => a + b.productTotalCost, 0)
  }

  render () {
    if (!this.props.project) {
      return null
    }

    const { project } = this.props
    const { isEmptyModalVisible } = this.state

    return (
      <Query query={CART_ITEMS_QUERY}>
        {({ loading, error, refetch, data }) => {
          // for unknown reason, refetch from the mutation is not working
          const products = data.cart.filter(product => product.projectId === project.id)
          const inWarehouse = products.filter(i => i.inWarehouse === true)
          const notInWarehouse = products.filter(i => i.inWarehouse === false || i.inWarehouse === null)
          const offPlatformItems = products.filter(item => item.type === 'Off-Platform Items')
          return (
            <Mutation
              refetchQueries={[
                { query: CART_ITEMS_QUERY },
                { query: CART_ITEMS_COUNT },
                { query: CART_ITEMS_TOTAL_SUM }
              ]}
              mutation={EDIT_CART_ITEM_MUTATION}
            >
              {editCartItem => (
                <>
                  <Meta title="Cart" />
                  <BudgetBar project={project} />
                  <Holder flexDirection="column" px={2}>
                    <CartList
                      mt={4}
                      collapsableTitle="In Warehouse"
                      items={inWarehouse}
                      onCheckboxClick={(id, isSelected) =>
                        this.handleCheckboxClick(id, isSelected, products, editCartItem)}
                      price={`${formatCurrency(this.totalItems(inWarehouse))} Total`}
                    />
                    <CartList
                      mt={4}
                      collapsableTitle="Out of Warehouse"
                      items={notInWarehouse}
                      onCheckboxClick={(id, isSelected) =>
                        this.handleCheckboxClick(id, isSelected, products, editCartItem)}
                      price={`${formatCurrency(this.totalItems(notInWarehouse))} Total`}
                    />
                    <CartList
                      mt={4}
                      collapsableTitle="Off-Platform Items"
                      items={offPlatformItems}
                      onCheckboxClick={(id, isSelected) =>
                        this.handleCheckboxClick(id, isSelected, products, editCartItem)}
                      price={`${formatCurrency(this.totalItems(offPlatformItems))} Total`}
                      onItemClick={this.handleModalOpen}
                    />
                    <Modal onClose={this.handleModalClose} open={this.state.isEditModalVisible}>
                      <ModalContent>
                        <AdditionalItemForm
                          initialValues={this.state.initialValues}
                          onSubmit={values => this.handleEdit(values, editCartItem)}
                          onClose={this.handleModalClose}
                        />
                      </ModalContent>
                    </Modal>
                    <Flex mt={2} mb={5} flexDirection="row" justifyContent="space-between">
                      <Query query={CART_ITEMS_TOTAL_SUM}>
                        {({ loading, error, data }) => {
                          return (
                            <Box width="49%">
                              <TotalWrapper mt={4} flexDirection="column">
                                <LabelContainer p={3}>
                                  <Text color={theme.colors.darkPurple} fontSize={3} bold>
                                    Total Estimate Cost
                                  </Text>
                                </LabelContainer>
                                <TableHeader py={2} px={3}>
                                  <ColumnHeader fontSize={theme.fontSizes[0]} width={[2 / 3]}>
                                    Category
                                  </ColumnHeader>
                                  <ColumnHeader fontSize={theme.fontSizes[0]} width={[1 / 3]}>
                                    Total
                                  </ColumnHeader>
                                </TableHeader>
                                <Flex flexDirection="column">
                                  <TableItem py={3}>
                                    <Box pl={3} width={[2 / 3]}>
                                      <Text>In Warehouse</Text>
                                    </Box>
                                    <Box pr={3} width={[1 / 3]}>
                                      <Text>{inWarehouse ? formatCurrency(this.totalItems(inWarehouse)) : '----'}</Text>
                                    </Box>
                                  </TableItem>
                                  <TableItem py={3}>
                                    <Box pl={3} width={[2 / 3]}>
                                      <Text>Out of Warehouse</Text>
                                    </Box>
                                    <Box pr={3} width={[1 / 3]}>
                                      <Text>
                                        {notInWarehouse ? formatCurrency(this.totalItems(notInWarehouse)) : '----'}
                                      </Text>
                                    </Box>
                                  </TableItem>
                                  <TableItem py={3}>
                                    <Box pl={3} width={[2 / 3]}>
                                      <Text>Off-Platform Items</Text>
                                    </Box>
                                    <Box pr={3} width={[1 / 3]}>
                                      <Text>
                                        {offPlatformItems ? formatCurrency(this.totalItems(offPlatformItems)) : '----'}
                                      </Text>
                                    </Box>
                                  </TableItem>
                                </Flex>
                                <LabelContainer p={3} additionalStyles="border-top: 1px solid #cfd8dc;">
                                  <Box width={[2 / 3]}>
                                    <ColumnHeader color={theme.colors.darkPurple}>Total:</ColumnHeader>
                                  </Box>
                                  <Box width={[1 / 3]}>
                                    <ColumnHeader color={theme.colors.darkPurple}>
                                      {formatCurrency(data.cartItemsTotalSum ? data.cartItemsTotalSum.sum : 0)}
                                    </ColumnHeader>
                                  </Box>
                                </LabelContainer>
                              </TotalWrapper>
                              <Flex mt={4} ml={'auto'} mr={'auto'} width="75%"
                                justifyContent="center">
                                <ExportToSheetsButton
                                  totalCost={formatCurrency(data.cartItemsTotalSum ? data.cartItemsTotalSum.sum : 0)}
                                  items={[...inWarehouse, ...notInWarehouse]}
                                  offPlatformItems={offPlatformItems}
                                  project={this.props.project}
                                />
                              </Flex>
                            </Box>
                          )
                        }}
                      </Query>
                      <Flex width="49%" flexDirection="column">
                        <TotalWrapper mt={4} flexDirection="column">
                          <LabelContainer p={3}>
                            <Text color={theme.colors.darkPurple} fontSize={3} bold>
                              Project Budget Summary
                            </Text>
                          </LabelContainer>
                          <TableHeader py={2} px={3}>
                            <ColumnHeader fontSize={theme.fontSizes[0]} width={[2 / 3]}>
                              Category
                            </ColumnHeader>
                            <ColumnHeader fontSize={theme.fontSizes[0]} width={[1 / 3]}>
                              Total
                            </ColumnHeader>
                          </TableHeader>
                          <Flex flexDirection="column">
                            <TableItem py={3}>
                              <Box pl={3} width={[2 / 3]}>
                                <Text>Day 1 FF&E Baseline Budget</Text>
                              </Box>
                              <Box pr={3} width={[1 / 3]}>
                                <Text>
                                  {formatCurrency(
                                    calculateBaselineBudget(
                                      project.type,
                                      project.size,
                                      getTierByFoundationValue(project.tier).value
                                    )
                                  ) || '----'}
                                </Text>
                              </Box>
                            </TableItem>
                            <TableItem py={3}>
                              <Box pl={3} width={[2 / 3]}>
                                <Text>Day 1 FF&E Baseline Allowance</Text>
                              </Box>
                              <Box pr={3} width={[1 / 3]}>
                                <Text>
                                  {formatCurrency(
                                    calculateAllowance(
                                      calculateBaselineBudget(
                                        project.type,
                                        project.size,
                                        getTierByFoundationValue(project.tier).value
                                      )
                                    )
                                  ) || '----'}
                                </Text>
                              </Box>
                            </TableItem>
                            <TableItem py={3}>
                              <Box pl={3} width={[2 / 3]}>
                                <Text>Day 1 FF&E Budget Upgrades</Text>
                              </Box>
                              <Box pr={3} width={[1 / 3]}>
                                <Text>
                                  {formatCurrency(
                                    calculateBudgetUpgrades(
                                      products.filter(product => product.isUpgrade)
                                    )
                                  )}
                                </Text>
                              </Box>
                            </TableItem>
                          </Flex>
                          <LabelContainer p={3} additionalStyles="border-top: 1px solid #cfd8dc;">
                            <Box width={[2 / 3]}>
                              <ColumnHeader color={theme.colors.darkPurple}>Total Budget:</ColumnHeader>
                            </Box>
                            <Box width={[1 / 3]}>
                              <ColumnHeader color={theme.colors.darkPurple}>
                                {formatCurrency(
                                  calculateBaselineBudget(
                                    project.type,
                                    project.size,
                                    getTierByFoundationValue(project.tier).value
                                  ) +
                                    calculateBudgetUpgrades(
                                      products.filter(product => product.isUpgrade)
                                    ) -
                                    calculateAllowance(
                                      calculateBaselineBudget(
                                        project.type,
                                        project.size,
                                        getTierByFoundationValue(project.tier).value
                                      )
                                    )
                                )}
                              </ColumnHeader>
                            </Box>
                          </LabelContainer>
                        </TotalWrapper>
                        <Box>
                          <EmptyCart width={[1, 1 / 3]} ml="auto" onClick={() => this.handleOpenEmptyModal()}>
                            Empty Cart
                          </EmptyCart>
                        </Box>
                      </Flex>
                    </Flex>
                  </Holder>
                  <Mutation
                    refetchQueries={[
                      { query: CART_ITEMS_QUERY },
                      { query: CART_ITEMS_COUNT },
                      { query: CART_ITEMS_TOTAL_SUM }
                    ]}
                    mutation={EMPTY_CART_MUTATION}
                  >
                    {emptyCart => (
                      <ConfirmationModal
                        secondary
                        open={isEmptyModalVisible}
                        onClose={this.handleCloseEmptyModal(false)}
                        onConfirm={this.handleCloseEmptyModal(true, emptyCart)}
                        actionLabel="Empty Cart"
                        title="Empty Cart"
                        subTitle="Are you sure you want to empty your cart? This cannot be undone."
                      />
                    )}
                  </Mutation>
                </>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

CartScreen.propTypes = {
  project: PropTypes.object,
  products: PropTypes.array,
}

function mapStateToProps (state) {
  return {
    project: state.projects.selectedProject
  }
}

export default connect(mapStateToProps)(CartScreen)
