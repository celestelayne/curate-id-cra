import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#1379C1',
    borderBottomStyle: 'solid',
    height: 24,
    marginTop: 30,
    fontSize: 16,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    width: '50%',
  },
  titleRow: {
    flexDirection: 'row',
  },
  titleContent: {
    flex: 1,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    width: '50%',
    marginLeft: 10,
  },
  rightRow: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  priceColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  priceContent: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
  quantityColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  quantityContent: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
  totalColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  totalContent: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
})

const CreatePDFHeading = ({ title, totalHeader }) => (
  <View style={styles.container}>
    <View style={styles.leftColumn}>
      <View style={styles.titleRow}>
        <Text style={styles.titleContent}>{title}</Text>
      </View>
    </View>
    {!totalHeader && (
      <>
        <View style={styles.rightColumn}>
          <View style={styles.rightRow}>
            <View style={styles.priceColumn}>
              <View style={styles.priceRow}>
                <Text style={styles.priceContent}>Price</Text>
              </View>
            </View>
            <View style={styles.quantityColumn}>
              <View style={styles.quantityRow}>
                <Text style={styles.quantityContent}>Quantity</Text>
              </View>
            </View>
            <View style={styles.totalColumn}>
              <View style={styles.totalRow}>
                <Text style={styles.totalContent}>Total</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    )}
  </View>
)

CreatePDFHeading.propTypes = {
  title: PropTypes.string,
  totalHeader: PropTypes.bool,
}

export default CreatePDFHeading
