import React from 'react'
import PropTypes from 'prop-types'
import { BlobProvider, Document, Page, StyleSheet } from '@react-pdf/renderer'
import { Button } from '@knotel/cinderblock'
import CreatePDFAppBar from './CreatePDFAppBar'
import CreatePDFHeading from './CreatePDFHeading'
import CreatePDFItem from './CreatePDFItem'
import CreatePDFTotals from './CreatePDFTotals'
import CreatePDFClient from './CreatePDFClient'

const styles = StyleSheet.create({
  page: {
    padding: 30
  }
})

// Create Document
const PurchaseOrder = (client, inWarehouse, notInWarehouse, offPlatformItems, totalPrice) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <CreatePDFAppBar />
      {client &&
        <CreatePDFClient client={client} />
      }
      <CreatePDFHeading title="Items in Warehouse" />
      {inWarehouse.map((item, i) => <CreatePDFItem key={i} item={item} />)}
      <CreatePDFHeading title="Items Not in Warehouse" />
      {notInWarehouse.map((item, i) => <CreatePDFItem key={i} item={item} />)}
      <CreatePDFHeading title="Additional Items" />
      {offPlatformItems.map((item, i) => <CreatePDFItem key={i} item={item} />)}
      <CreatePDFHeading title="Total" totalHeader />
      <CreatePDFTotals totalPrice={totalPrice} />
    </Page>
  </Document>
)

class CreatePDFButton extends React.Component {
  render () {
    const { client, inWarehouse, notInWarehouse, offPlatformItems, totalPrice } = this.props
    return (
      <BlobProvider document={PurchaseOrder(client, inWarehouse, notInWarehouse, offPlatformItems, totalPrice)}>
        {({ blob, url, loading, error }) => {
          if (error) {
            return error
          }
          return (
            <Button disabled={loading} onClick={() => (window.open(URL.createObjectURL(blob)))}>
              PDF
            </Button>
          )
        }}
      </BlobProvider>
    )
  }
}

CreatePDFButton.propTypes = {
  client: PropTypes.any,
  inWarehouse: PropTypes.array,
  notInWarehouse: PropTypes.array,
  offPlatformItems: PropTypes.array,
  totalPrice: PropTypes.number,
}

export default CreatePDFButton
